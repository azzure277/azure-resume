const { app } = require('@azure/functions');

app.http('contact', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('Contact form function processed a request.');

        try {
            // Set CORS headers
            const headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            };

            // Handle preflight OPTIONS request
            if (request.method === 'OPTIONS') {
                return {
                    status: 200,
                    headers: headers
                };
            }

            // Parse request body
            const body = await request.json();
            const { name, email, subject, message } = body;

            // Validate required fields
            if (!name || !email || !subject || !message) {
                return {
                    status: 400,
                    headers: headers,
                    body: JSON.stringify({
                        error: 'Missing required fields',
                        success: false
                    })
                };
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return {
                    status: 400,
                    headers: headers,
                    body: JSON.stringify({
                        error: 'Invalid email format',
                        success: false
                    })
                };
            }

            // Log the contact form submission
            context.log('Contact form submission:', {
                name,
                email,
                subject,
                timestamp: new Date().toISOString()
            });

            // In a real application, you would:
            // 1. Send an email using SendGrid, Azure Communication Services, or similar
            // 2. Store the message in a database
            // 3. Send a confirmation email to the user
            
            // For this demo, we'll just log the message and return success
            // You can integrate with email services like:
            // - Azure Communication Services
            // - SendGrid
            // - Azure Logic Apps
            // - Power Automate

            // Simulate email sending (replace with actual email service)
            const emailSent = await simulateEmailSending({
                to: process.env.CONTACT_EMAIL || 'your.email@example.com',
                from: email,
                subject: `Contact Form: ${subject}`,
                text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Sent from Azure Resume contact form at ${new Date().toISOString()}
                `
            });

            if (emailSent) {
                return {
                    status: 200,
                    headers: headers,
                    body: JSON.stringify({
                        message: 'Contact form submitted successfully',
                        success: true
                    })
                };
            } else {
                throw new Error('Failed to send email');
            }

        } catch (error) {
            context.log.error('Error in contact form function:', error);
            
            return {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    error: 'Internal server error',
                    message: 'Failed to process contact form',
                    success: false
                })
            };
        }
    }
});

// Simulate email sending - replace with actual email service
async function simulateEmailSending(emailData) {
    // This is a placeholder function
    // In a real application, integrate with:
    // - Azure Communication Services Email
    // - SendGrid
    // - Other email providers
    
    console.log('Email would be sent:', emailData);
    
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return true; // Simulate success
}
