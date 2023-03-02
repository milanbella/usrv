#!/bin/bash
set -xe

openssl req -x509 -days 10000 -newkey rsa:4096 \
-keyout key.pem -out cert.pem \
-subj "/C=SK/ST=SK/L=BA/O=Usrv Inc./OU=IT/CN=usrv.com" -nodes

openssl pkcs8 -topk8 \
-inform PEM -outform PEM \
-in key.pem -out key-pkcs8.pem -nocrypt
