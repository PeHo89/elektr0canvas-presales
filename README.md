## Tech Stack Involved

- React    - Front end library
- Solidity - The language used to build smart contracts that run on Ethereum

### Let’s Get Started!

>_Make sure you already have the Metamask downloaded. If not, download it from  [here](https://metamask.io/)._

#### Install the following dependencies:
[Create React App](https://github.com/facebookincubator/create-react-app) is an intuitive package and is the best way to start building a new  [single page](https://reactjs.org/docs/glossary.html#single-page-application)  application in React.

## Deployment
Clone the this repo in /var/www folder.
Paste the 000-default.conf to /etc/apache2/sites-available/ folder
>_sudo chmod -R 777 elektr0canvas-presales/

Replace the env files for frontend and backend.
>_npm run build in root folder
>_rm -rf backend/frame/static
>_./manage.py collectstatic

Please ref [this website](https://www.digitalocean.com/community/tutorials/how-to-serve-django-applications-with-apache-and-mod_wsgi-on-ubuntu-14-04)

>_sudo chown :www-data elektr0canvas-presales/
>_sudo service apache2 restart

## Support

If you need more clarifications, feel free to join our Telegram or Slack community channels. You can also write us an email at [fstar0550@gmail.com](mailto:fstar0550@gmail.com)
