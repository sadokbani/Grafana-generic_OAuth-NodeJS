# Grafana-generic_OAuth-NodeJS
authentication grafana with generic oauth

Step 1:

-Clone this repository git clone https://github.com/sadokbani/Grafana-generic_OAuth-NodeJS.git

-npm install

-node server.js

Step 2:

Edit Grafana configuration file that is located at /etc/grafana/grafana.ini on Ubuntu / Debian, /usr/local/etc/grafana/grafana.ini on MAC, <GRAFANA_PROJECT_FOLDER>/conf/custom.ini on Windows.


Uncomment these lines and enter your client_id, client_secret, auth_url, token_url, api_url:



#################################### Generic OAuth ##########################

[auth.generic_oauth]

;enabled = true

;name = OAuth

;allow_sign_up = false

;client_id = some_id

;client_secret = some_secret

;scopes = user:email,read:org

;auth_url =

;token_url =

;api_url =

Like so:


#################################### Generic OAuth ##########################

[auth.generic_oauth]

enabled = true

name = OAuth

allow_sign_up = true

auth_url = http://localhost:8000/login

token_url = http://localhost:8000/users/token

api_url = http://localhost:8000/users/api/

role_attribute_path = role



Step3:

Restart Grafana server.


sudo service grafana-server restart (Ubuntu / Debian)

brew services restart grafana (MAC)

or

run grafana server sous windows with config file 

-cd grafana/bin

-grafana-server --config ../conf/custom.ini

