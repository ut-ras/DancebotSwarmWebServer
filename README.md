# DancebotSwarmUI
Github hosted front end for the Dancebot Swarm Robots

## Setup and Testing
### Ubuntu
* https://ubuntu.com/tutorials/install-and-configure-nginx#1-overview
* Clone repo in this location: `/var/www/` (depends if the repo html is in the base url)
* Set up virtual host https://ubuntu.com/tutorials/install-and-configure-nginx#4-setting-up-virtual-host
  * change `root /var/www/tutorial` to `root /var/www/Dancebot` in the file.
* Restart nginx: `sudo service nginx restart`
* Check `localhost:PORT_YOU_SPECIFIED_IN_THE_FILE`

---
### Windows
* https://www.javatpoint.com/how-to-install-nginx-on-windows
* nginx should be at C:/nginx 
* There should be a config file, inside should display where the root is; https://stackoverflow.com/questions/19985228/nginx-change-document-root-directory
