import { ApolloClient } from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { typeDefs } from './schema'
import { resolvers, ACCESS_TOKEN } from './resolvers';

const isServer = () => typeof window === 'undefined'

export default (initialState: NormalizedCacheObject) => {
  const cache = new InMemoryCache().restore(initialState)

  const httpLink = new HttpLink({
    uri: process.env.SERVER_URI,
    credentials: 'include'
  })

  const authLink = setContext((req, previoustContext) => {
    console.log('req', req)
    console.log('previoustContetx', previoustContext)

    // get the authentication token from local storage if it exists
    const isBrowser = typeof window !== 'undefined'
    let signedIn,
      data = ''

    // TODO - update signed_in when user logs out or refreshes page
    // TODO - need to remove signed in value from local storage.
    if (isBrowser) {
      // cache.writeData
      signedIn = localStorage.getItem('signed_in')
      if (signedIn == 'true') {
        data = cache.readQuery({ query: ACCESS_TOKEN }) || ''
        console.log('in context access token', data);
      }
    }
    console.log('signedIn test', signedIn)

    // if(signedIn) data = cache.readQuery({query: ACCESS_TOKEN});

    // TODO - update the data to inclued .access_token
    return {
      headers: {
        ...previoustContext.headers,
        authorization: data ? `Bearer ${data}` : '',
        'Access-Control-Allow-Origin': process.env.CLIENT_URI
      }
    }
  })

  return new ApolloClient({
    name: 'No Meat May',
    version: 'v0.0.0',
    cache,
    link: authLink.concat(httpLink),
    connectToDevTools: !isServer(),
    // Disables forceFetch on the server (so queries are only run once)
    ssrMode: isServer(),
    typeDefs,
    resolvers
  })
}


