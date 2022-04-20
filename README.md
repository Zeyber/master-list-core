# Master List

An organizational list that leverages third-party APIs and displays information in a simple list.

Sometimes managing so many tasks can become overwhelming (eg. emails, agenda, tasks, social media, communications across multiple platforms). It is easy lose track of what needs to be done, when and how much you really need to do.

Master List is a node-based solution that runs on any machine within the command line. It features connecting to APIs via “providers” that can be configured to read relevant important information that the client may require.

## Applications

- Communications: Monitoring incoming messages, emails, chats, etc.
- Notifications: Monitoring generic notifications from applications.
- Analytics: Live monitoring analytical applications (eg. Google Analytics, AWS CloudWatch, etc).
- Agenda: Display relevant Calendar appointments.
- To Dos and Issue Tracking: Show tasks on To Do lists or assigned Github/Atlassian Issues.

### Example: Task list monitoring live data via `Providers`

Using Master List providers for tracking on a Rasberry Pi Zero connected to a monitor.

See printer repo: https://github.com/Zeyber/master-list-printer

## Providers

Providers are third-party wrappers that provide a link between an API or website and a Master List application.

### Examples

- Github Issue Tracking: https://gihub.com/Zeyber/master-list-github-provider
