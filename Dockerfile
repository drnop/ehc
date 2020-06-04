FROM ubuntu:18.04
RUN apt-get update
RUN apt-get -y install curl
RUN apt-get -y install apache2
RUN apt-get -y install python3-pip
RUN apt-get -y install vim-tiny
RUN apt-get -y install net-tools
COPY requirements.txt .
RUN pip3 install -r requirements.txt
RUN ln -s /etc/apache2/mods-available/cgi.load /etc/apache2/mods-enabled/cgi.load
COPY *.py /usr/lib/cgi-bin/
COPY ehc*.html /var/www/html/
RUN rm /var/www/html/index.html; ln -sf /var/www/html/ehc.html /var/www/html/index.html
COPY ehc.js /var/www/html/
COPY ehc.css /var/www/html/
COPY labrats.png /var/www/html
COPY about.jpg /var/www/html
EXPOSE 80
CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]

