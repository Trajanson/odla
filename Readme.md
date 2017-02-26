# [Odla][odla]

[Odla][odla] is an accompaniment to Joshua Foer's New York Times bestselling Moonwalking with Einstein.

Learn and play at [odla.rocks][odla]

#### Instructions
Odla is easy to use! Simply login and click "Daily Moonwalk" to access and you memorize your day's telephone number. If you don't remember or would like to change the image that matches to each number, click on your name in the top-right and select "Image Representations" under Settings.

Come back the following day and complete your challenge by selecting "Moonwalks in Progress" and clicking on your acquaintance.


#### Feature: Image Uploading
The complicated process of allowing users to select the pictures they like, saving the pictures, and associating them to users as their imageRepresentations in the database is fulfilled by the following code.

The `multer and `multerS3` libraries were used to store the image on Amazon's S3 cloud storage.

![uploadCode]




## Technologies Used

* [Node.js][node]
* [MongoDB][mongo]
* [Mongoose][mongoose]
* [Passport][passport]
* [Handlebar Templating][handlebars]
* [Bootstrap][bootstrap]
* [IBM Watson][watson]
* [JSON API][json]
* [Amazon Elastic Cloud Compute (AWS EC2)][ec2]
* [Amazon Simple Storage Service (AWS S3)][s3]
* [Docker][docker]
* [NGINX] [nginx]







[jounce]: http://www.odla.rocks/

[uploadCode]: ./docs/imageUploadCode.png


[node]: https://nodejs.org/en/
[mongo]: https://www.mongodb.com/
[mongoose]: http://mongoosejs.com/
[passport]: http://passportjs.org/
[handlebars]: http://handlebarsjs.com/
[bootstrap]: http://getbootstrap.com/
[watson]: https://www.ibm.com/watson/
[json]: http://jsonapi.org/
[ec2]: https://aws.amazon.com/ec2/
[s3]: https://aws.amazon.com/s3/
[docker]: https://www.docker.com/
[nginx]: https://www.nginx.com/resources/wiki/
