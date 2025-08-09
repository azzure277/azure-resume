targetScope = 'resourceGroup'

@minLength(1)
@maxLength(64)
@description('Name of the environment that can be used as part of naming resource convention')
param environmentName string

@minLength(1)
@description('Primary location for all resources')
param location string = resourceGroup().location

// Generate a unique token for resource names
var resourceToken = toLower(uniqueString(subscription().id, resourceGroup().id, location, environmentName))

// Storage account for static website
resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: 'st${resourceToken}'
  location: location
  kind: 'StorageV2'
  sku: {
    name: 'Standard_LRS'
  }
  properties: {
    allowBlobPublicAccess: true
    supportsHttpsTrafficOnly: true
    minimumTlsVersion: 'TLS1_2'
  }
  tags: {
    'azd-env-name': environmentName
  }
}

// Enable static website hosting
resource staticWebsite 'Microsoft.Storage/storageAccounts/blobServices@2023-01-01' = {
  parent: storageAccount
  name: 'default'
  properties: {
    cors: {
      corsRules: [
        {
          allowedHeaders: ['*']
          allowedMethods: ['GET', 'HEAD', 'OPTIONS']
          allowedOrigins: ['*']
          exposedHeaders: ['*']
          maxAgeInSeconds: 86400
        }
      ]
    }
  }
}

// Outputs
output RESOURCE_GROUP_ID string = resourceGroup().id
output STORAGE_ACCOUNT_NAME string = storageAccount.name
output STATIC_WEBSITE_URL string = 'https://${storageAccount.name}.z13.web.core.windows.net'
output STORAGE_ACCOUNT_ID string = storageAccount.id
