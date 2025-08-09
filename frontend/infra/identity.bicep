@description('Name of the user-assigned managed identity')
param name string

@description('Location for the managed identity')
param location string

@description('Environment name')
param environmentName string

resource userAssignedIdentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' = {
  name: name
  location: location
  tags: {
    'azd-env-name': environmentName
  }
}

output id string = userAssignedIdentity.id
output name string = userAssignedIdentity.name
output principalId string = userAssignedIdentity.properties.principalId
output clientId string = userAssignedIdentity.properties.clientId
