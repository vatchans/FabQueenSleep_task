const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app');
const expect = chai.expect;
const { Blog } = require('./DB/Schema/Blog')
chai.use(chaiHttp);

describe('Blog Post', () => {
  let postid;

  beforeEach(async () => {
    const response = await chai
      .request(app)
      .post('/api/posts')
      .set('api-key', process.env.api_Key)
      .send({
        title: 'Test Post',
        content: 'This is a test post',
        category_id: '123',
        category: 'Test Category',
      });
    const newPost = await Blog.findOne({ category_id: '123' })
    postid = newPost._id.toString();
  });
 
  describe('POST /api/posts', () => {
    it('should create a new blog post', async () => {
      const response = await chai
        .request(app)
        .post('/api/posts')
        .set('api-key', process.env.api_Key)
        .send({
          title: 'New Post',
          content: 'This is a new post',
          category_id: '456',
          category: 'New Category',
        });
      expect(response).to.have.status(201);
      expect(response.text).to.equal('New Blog post created successfully');
    });

    it('should return 400 Bad Request if required parameters are missing', async () => {
      const response = await chai
        .request(app)
        .post('/api/posts')
        .set('api-key', process.env.api_Key)
        .send({ title: 'New Post' });

      expect(response).to.have.status(400);
    });
    it('should return 401 Unauthorized error if API key is missing', async () => {
      const response = await chai
        .request(app)
        .post('/api/posts')
        .send({
          title: 'New Post',
          content: 'This is a new post',
          category_id: '456',
          category: 'New Category',
        });

      expect(response).to.have.status(401);
    });
  });

  describe('GET /api/posts', () => {
    it('should Get list of all blog posts', async () => {
      const response = await chai.request(app).get('/api/posts').set('api-key', process.env.api_Key);

      expect(response).to.have.status(200);
      expect(response.body).to.be.an('array');
    });
    it('should return 401 Unauthorized error if API key is missing', async () => {
      const response = await chai.request(app).get('/api/posts')

      expect(response).to.have.status(401);
    });
  });

  describe('GET /api/posts/:id', () => {
    it('should Get a specific blog post', async () => {
      const response = await chai.request(app).get(`/api/posts/${postid}`).set('api-key', process.env.api_Key);
      expect(response).to.have.status(200);
      expect(response.body._id).to.equal(postid);
    });
    it('should return 401 Unauthorized error if API key is missing', async () => {
      const response = await chai.request(app).get(`/api/posts/${postid}`)
      expect(response).to.have.status(401);
    });
  });

  describe('PUT /api/posts/:id', () => {
    it('should update a specific blog post', async () => {
      const Title = 'Updated Post Title';
      const Content = 'Updated Content'
      const response = await chai
        .request(app)
        .put(`/api/posts/${postid}`)
        .set('api-key', process.env.api_Key)
        .send({ title: Title, content: Content })

      expect(response).to.have.status(200);
      expect(response.body.title).to.equal(Title);
    });


    it('should return 400 Bad Request if required parameters are missing', async () => {
      const response = await chai
        .request(app)
        .put(`/api/posts/${postid}`)
        .set('api-key', process.env.api_Key)
        .send({ content: 'Updated Content' });

      expect(response).to.have.status(400);
    });

    it('should return 401 Unauthorized if API key is missing', async () => {
      const Title = 'Updated Post Title';
      const Content = 'Updated Content'
      const response = await chai
        .request(app)
        .put(`/api/posts/${postid}`)
        .send({ title: Title, content: Content })
      expect(response).to.have.status(401);
    });
  });
  
  describe('GET/api/post/latest', () => {
    it('should return the latest post in each category', async () => {
      const response = await chai.request(app).get('/api/post/latest').set('api-key', process.env.api_Key);
      expect(response).to.have.status(200);
      expect(response.body).to.be.an('array');
    });
    
    it('should return 401 Unauthorized error if API key is missing', async () => {
      const response = await chai.request(app).get('/api/post/latest');

      expect(response).to.have.status(401);
    });

  })

  describe('DELETE /api/posts/:id', () => {
    it('should delete a specific blog post', async () => {
      const response = await chai.request(app).delete(`/api/posts/${postid}`).set('api-key', process.env.api_Key);

      expect(response).to.have.status(200);
      expect(response.text).to.equal('Blog post deleted successfully');
    });

    it('should return 401 Unauthorized error if API key is missing', async () => {
      const response = await chai.request(app).delete(`/api/posts/${postid}`);

      expect(response).to.have.status(401);
    });
  });


});
