# DancebotSwarmUI
Github hosted front end for the Dancebot Swarm Robots

## Setup and Testing
### Ubuntu


---
### Windows


## Development
* Suggestion to make the folder in a local directory (for me, `Documents/Github/`) and copy the folder over to the root `/var/www/` when testing. This reduces annoying sudo permissions.


## Dependencies
* CouchDB
  * [Ubuntu/Debian](https://docs.couchdb.org/en/latest/install/unix.html#installation-using-the-apache-couchdb-convenience-binary-packages)
  * [Windows](https://neighbourhood.ie/download-apache-couchdb-win/)
  * If prompted, you should set the password to whatever you like. Later on, when you have enabled the database, you can create an admin with the credentials:
    * `Username: Demobots`
    * `Passsword: Mothership` (if you're using this guide for something other than the mothership, please don't use these credentials)
  * If you configured this correctly, you should be able to find the login page at `http://127.0.0.1:5984/_utils/#login`.
* Nginx
  * [Ubuntu](https://ubuntu.com/tutorials/install-and-configure-nginx#1-overview)
    * Clone repo in this location: `/var/www/` (depends if the repo html is in the base url)
    * Set up virtual host https://ubuntu.com/tutorials/install-and-configure-nginx#4-setting-up-virtual-host
      * change `root /var/www/tutorial` to `root /var/www/Dancebot` in the file.
    * Restart nginx: `sudo service nginx restart`
    * Check `localhost:PORT_YOU_SPECIFIED_IN_THE_FILE`
  * [Windows](https://www.javatpoint.com/how-to-install-nginx-on-windows)
    * nginx should be at C:/nginx 
    * There should be a config file, inside should display where the root is; https://stackoverflow.com/questions/19985228/nginx-change-document-root-directory (might be easier to modify the file from https://ubuntu.com/tutorials/install-and-configure-nginx#4-setting-up-virtual-host)