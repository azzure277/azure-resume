targetScope = 'subscription'

@description('Environment name')
param environmentName string

@description('Location for resources')
param location string = 'East US'

@description('Resource group name')
param resourceGroupName string

var resourceToken = uniqueString(subscription().id, location, environmentName)
var resourcePrefix = 'bfr'

resource resourceGroup 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: resourceGroupName
  location: location
  tags: {
    'azd-env-name': environmentName
  }
}

module userAssignedIdentity 'identity.bicep' = {
  name: 'userAssignedIdentity'
  scope: resourceGroup
  params: {
    name: 'id-${resourcePrefix}-${resourceToken}'
    location: location
    environmentName: environmentName
  }
}

module staticWebApp 'staticwebapp.bicep' = {
  name: 'staticWebApp'
  scope: resourceGroup
  params: {
    name: 'az-${resourcePrefix}-${resourceToken}'
    location: location
    environmentName: environmentName
    userAssignedIdentityId: userAssignedIdentity.outputs.id
  }
}

output RESOURCE_GROUP_ID string = resourceGroup.id
output STATIC_WEB_APP_NAME string = staticWebApp.outputs.name
output STATIC_WEB_APP_URL string = staticWebApp.outputs.uri
output USER_ASSIGNED_IDENTITY_ID string = userAssignedIdentity.outputs.id
output USER_ASSIGNED_IDENTITY_CLIENT_ID string = userAssignedIdentity.outputs.clientId
