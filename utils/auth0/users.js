import { managementClient } from 'utils/auth0'

export async function getUsers(req, res) {
  managementClient
    .getUsers()
    .then(function (users) {
      console.log(users);
    })
    .catch(function (err) {
      console.log(err)
    })
}

// {
//   blog: 'https://RonSneh.com',
//   created_at: '2020-11-26T07:56:07.978Z',
//   email: 'hi@ronsneh.com',
//   events_url: 'https://api.github.com/users/rsneh/events{/privacy}',
//   followers: 2,
//   followers_url: 'https://api.github.com/users/rsneh/followers',
//   following: 4,
//   following_url: 'https://api.github.com/users/rsneh/following{/other_user}',
//   gists_url: 'https://api.github.com/users/rsneh/gists{/gist_id}',
//   gravatar_id: '',
//   html_url: 'https://github.com/rsneh',
//   identities: [ [Object] ],
//   location: 'Israel',
//   name: 'Ron Sneh',
//   nickname: 'rsneh',
//   node_id: 'MDQ6VXNlcjI4NDczNDk=',
//   organizations_url: 'https://api.github.com/users/rsneh/orgs',
//   picture: 'https://avatars1.githubusercontent.com/u/2847349?v=4',
//   public_gists: 0,
//   public_repos: 17,
//   received_events_url: 'https://api.github.com/users/rsneh/received_events',
//   repos_url: 'https://api.github.com/users/rsneh/repos',
//   site_admin: false,
//   starred_url: 'https://api.github.com/users/rsneh/starred{/owner}{/repo}',
//   subscriptions_url: 'https://api.github.com/users/rsneh/subscriptions',
//   twitter_username: 'ronsneh',
//   type: 'User',
//   updated_at: '2020-11-26T10:47:47.028Z',
//   url: 'https://api.github.com/users/rsneh',
//   user_id: 'github|2847349',
//   last_login: '2020-11-26T10:47:47.027Z',
//   last_ip: '84.228.120.79',
//   logins_count: 4
// }