FROM alpine:3.15.4
# Define Environment variables
ENV PATHS="/var/www/html /var/log/nginx /var/lib/nginx /var/tmp/nginx /run /etc/nginx" 


RUN apk add --update --no-cache \
        tini \
        nginx \ 
        iputils \
        curl; \
    rm -rf /var/cache/apk/*; \
    rm -rf /tmp/*; \
    mkdir -p ${PATHS};

COPY dist/todo /var/www/html/
COPY nginx.conf /etc/nginx/nginx.conf

# setup paths and permissions
RUN chgrp -R nobody ${PATHS}; \
    chmod -R 777 ${PATHS}; \
    ls -la ${PATHS};

# let tini handle all the zombies
ENTRYPOINT [ "/sbin/tini" , "--" ]

# start all required processes
CMD [ "nginx", "-c", "/etc/nginx/nginx.conf", "-g", "daemon off;" ]
