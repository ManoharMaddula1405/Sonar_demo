import axios from 'axios';
import { useState, useEffect } from 'react';
import { styled } from '@mui/styles';

interface Post {
  id: number;
  title: string;
  body: string;
}

const Center = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});

const Table = styled('table')({
  borderCollapse: 'collapse',
  marginTop: '1rem',
  '& th, td': {
    padding: '0.5rem',
    border: '1px solid #ccc',
  },
  '& th': {
    fontWeight: 'bold',
  },
});

const Button = styled('button')({
  backgroundColor: 'black',
  color: 'white',
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '0.25rem',
  cursor: 'pointer',
  marginRight: '0.5rem',
  '&:hover': {
    backgroundColor: 'darkblue',
  },
});

const DataBlog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const apiEndPoint = 'https://jsonplaceholder.typicode.com/posts';
  useEffect(() => {
    const getPosts = async () => {
      const { data: res } = await axios.get(apiEndPoint);
      setPosts(res);
    };
    getPosts();
  }, []);
  const addPost = async () => {
    const post = {
      id: 101,
      title: 'New Post',
      body: 'new',
    };
    await axios.post(apiEndPoint, post);
    setPosts([post, ...posts]);
  };
  const updateme = async (post: Post) => {
    post.title = 'updated title';
    await axios.put(apiEndPoint + '/' + post.id);
    const postsClone = [...posts];
    const index = postsClone.indexOf(post);
    postsClone[index] = { ...post };
    setPosts(postsClone);
  };
  const deleteme = async (post: Post) => {
    await axios.delete(apiEndPoint + '/' + post.id + post);
    setPosts(posts.filter((p) => p.id !== post.id));
  };
  return (
    <Center>
      <div>
        <h2>There are {posts.length} posts in this blog</h2>
        <Button onClick={addPost}>Add Post</Button>
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <Button
                    onClick={() => {
                      updateme(post);
                    }}
                  >
                    Update
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      deleteme(post);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Center>
  );
};

export default DataBlog;
