const { app } = require('@azure/functions');
const { CosmosClient } = require('@azure/cosmos');

// Initialize Cosmos DB client
const cosmosClient = new CosmosClient({
    endpoint: process.env.COSMOS_DB_ENDPOINT,
    key: process.env.COSMOS_DB_KEY
});

const databaseId = process.env.COSMOS_DB_DATABASE_ID || 'resumedb';
const containerId = process.env.COSMOS_DB_CONTAINER_ID || 'visitors';

app.http('visitorCounter', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('Visitor counter function processed a request.');

        try {
            // Set CORS headers
            const headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            };

            // Handle preflight OPTIONS request
            if (request.method === 'OPTIONS') {
                return {
                    status: 200,
                    headers: headers
                };
            }

            // Get database and container
            const database = cosmosClient.database(databaseId);
            const container = database.container(containerId);

            const visitorId = 'visitor-count';

            if (request.method === 'POST') {
                // Increment visitor count
                try {
                    // Try to read existing document
                    const { resource: existingItem } = await container.item(visitorId, visitorId).read();
                    
                    // Increment count
                    const newCount = (existingItem?.count || 0) + 1;
                    
                    // Update document
                    const { resource: updatedItem } = await container.item(visitorId, visitorId).replace({
                        id: visitorId,
                        count: newCount,
                        lastUpdated: new Date().toISOString()
                    });

                    return {
                        status: 200,
                        headers: headers,
                        body: JSON.stringify({
                            count: updatedItem.count,
                            success: true
                        })
                    };
                } catch (error) {
                    if (error.code === 404) {
                        // Document doesn't exist, create it
                        const { resource: newItem } = await container.items.create({
                            id: visitorId,
                            count: 1,
                            lastUpdated: new Date().toISOString()
                        });

                        return {
                            status: 200,
                            headers: headers,
                            body: JSON.stringify({
                                count: newItem.count,
                                success: true
                            })
                        };
                    } else {
                        throw error;
                    }
                }
            } else {
                // GET request - just return current count
                try {
                    const { resource: item } = await container.item(visitorId, visitorId).read();
                    
                    return {
                        status: 200,
                        headers: headers,
                        body: JSON.stringify({
                            count: item?.count || 0,
                            success: true
                        })
                    };
                } catch (error) {
                    if (error.code === 404) {
                        return {
                            status: 200,
                            headers: headers,
                            body: JSON.stringify({
                                count: 0,
                                success: true
                            })
                        };
                    } else {
                        throw error;
                    }
                }
            }
        } catch (error) {
            context.log.error('Error in visitor counter function:', error);
            
            return {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    error: 'Internal server error',
                    message: error.message,
                    success: false
                })
            };
        }
    }
});
