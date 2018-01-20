from registry.cn-hangzhou.aliyuncs.com/dmcloudv1/javaweb:latest
COPY ./tomcat6/lib/* /usr/share/tomcat6/lib/
COPY ./web/* /var/lib/tomcat6/webapps/web/
COPY ./tomcat6/conf/* /var/lib/tomcat6/conf/
RUN chmod 777 -R /var/lib/tomcat6/webapps/
