
import React, { useState } from 'react';
import { Heart, Edit2, Trash2, Plus, User } from 'lucide-react';

export default function App() {
  const [view, setView] = useState('feed'); // 'feed' or 'myblogs'
  const [showNewPost, setShowNewPost] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  
  // Sample data - in a real app this would come from a backend
  const [feedPosts, setFeedPosts] = useState([
    { id: 1, author: 'Sarah Chen', title: 'Getting Started with React', content: 'React has been an amazing journey for me. The component-based architecture makes building UIs so intuitive...', likes: 24, isLiked: false, isMine: false },
    { id: 2, author: 'Mike Johnson', title: 'My Morning Routine', content: 'I wake up at 6 AM every day and start with a 30-minute meditation session. This has completely transformed my productivity...', likes: 15, isLiked: true, isMine: false },
    { id: 3, author: 'You', title: 'Learning to Code', content: 'Today I built my first React component and it felt amazing! The journey has been challenging but rewarding...', likes: 42, isLiked: false, isMine: true },
  ]);

  const [myPosts, setMyPosts] = useState([
    { id: 3, title: 'Learning to Code', content: 'Today I built my first React component and it felt amazing! The journey has been challenging but rewarding...', likes: 42 },
    { id: 4, title: 'Weekend Adventures', content: 'Went hiking in the mountains this weekend. The views were absolutely breathtaking and the fresh air was rejuvenating...', likes: 18 },
  ]);

  const handleLike = (postId) => {
    setFeedPosts(feedPosts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const handleDelete = (postId) => {
    setMyPosts(myPosts.filter(post => post.id !== postId));
    setFeedPosts(feedPosts.filter(post => post.id !== postId));
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setNewPost({ title: post.title, content: post.content });
    setShowNewPost(true);
  };

  const handleSubmit = () => {
    if (editingPost) {
      // Edit existing post
      setMyPosts(myPosts.map(post => 
        post.id === editingPost.id 
          ? { ...post, title: newPost.title, content: newPost.content }
          : post
      ));
      setFeedPosts(feedPosts.map(post => 
        post.id === editingPost.id 
          ? { ...post, title: newPost.title, content: newPost.content }
          : post
      ));
    } else {
      // Create new post
      const newPostObj = {
        id: Date.now(),
        title: newPost.title,
        content: newPost.content,
        likes: 0
      };
      setMyPosts([newPostObj, ...myPosts]);
      setFeedPosts([{ ...newPostObj, author: 'You', isLiked: false, isMine: true }, ...feedPosts]);
    }
    setNewPost({ title: '', content: '' });
    setShowNewPost(false);
    setEditingPost(null);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">VlogIt</h1>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-white hover:bg-gray-900 rounded-full font-medium transition border border-gray-700">
              Sign In
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-800">
          <button
            onClick={() => setView('feed')}
            className={`pb-3 px-4 font-medium transition ${
              view === 'feed'
                ? 'text-white border-b-2 border-white'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            Feed
          </button>
          <button
            onClick={() => setView('myblogs')}
            className={`pb-3 px-4 font-medium transition ${
              view === 'myblogs'
                ? 'text-white border-b-2 border-white'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            My Blogs
          </button>
        </div>

        {/* New Post Button */}
        {view === 'myblogs' && (
          <button
            onClick={() => {
              setShowNewPost(true);
              setEditingPost(null);
              setNewPost({ title: '', content: '' });
            }}
            className="w-full mb-6 p-4 bg-gray-900 border-2 border-dashed border-gray-700 rounded-lg hover:border-gray-500 hover:bg-gray-800 transition flex items-center justify-center gap-2 text-gray-400 hover:text-white font-medium"
          >
            <Plus size={20} />
            Write a new blog
          </button>
        )}

        {/* New/Edit Post Form */}
        {showNewPost && (
          <div className="bg-gray-900 rounded-lg shadow-md border border-gray-800 p-6 mb-6">
            <h3 className="text-xl font-bold mb-4 text-white">{editingPost ? 'Edit Blog' : 'New Blog'}</h3>
            <input
              type="text"
              placeholder="Blog title..."
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-500"
            />
            <textarea
              placeholder="Write your blog content..."
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg mb-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-white text-white placeholder-gray-500"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition font-medium"
              >
                {editingPost ? 'Update' : 'Post'}
              </button>
              <button
                onClick={() => {
                  setShowNewPost(false);
                  setEditingPost(null);
                  setNewPost({ title: '', content: '' });
                }}
                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Feed View */}
        {view === 'feed' && (
          <div className="space-y-4">
            {feedPosts.map(post => (
              <div key={post.id} className="bg-gray-900 rounded-lg shadow-md border border-gray-800 p-6 hover:shadow-lg hover:border-gray-700 transition">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-white font-bold">
                    {post.author[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{post.author}</p>
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-2 text-white">{post.title}</h2>
                <p className="text-gray-300 mb-4">{post.content}</p>
                <div className="flex items-center gap-4 pt-3 border-t border-gray-800">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 ${
                      post.isLiked ? 'text-white' : 'text-gray-500 hover:text-white'
                    } transition`}
                  >
                    <Heart size={20} fill={post.isLiked ? 'currentColor' : 'none'} />
                    <span className="font-medium">{post.likes}</span>
                  </button>
                  {post.isMine && (
                    <>
                      <button
                        onClick={() => handleEdit(post)}
                        className="flex items-center gap-2 text-gray-500 hover:text-white transition"
                      >
                        <Edit2 size={18} />
                        <span className="text-sm font-medium">Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="flex items-center gap-2 text-gray-500 hover:text-white transition"
                      >
                        <Trash2 size={18} />
                        <span className="text-sm font-medium">Delete</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* My Blogs View */}
        {view === 'myblogs' && (
          <div className="space-y-4">
            {myPosts.length === 0 ? (
              <div className="bg-gray-900 rounded-lg shadow-md border border-gray-800 p-12 text-center">
                <User size={48} className="mx-auto text-gray-600 mb-3" />
                <p className="text-gray-400 text-lg">No blogs yet. Start writing!</p>
              </div>
            ) : (
              myPosts.map(post => (
                <div key={post.id} className="bg-gray-900 rounded-lg shadow-md border border-gray-800 p-6 hover:shadow-lg hover:border-gray-700 transition">
                  <h2 className="text-xl font-bold mb-2 text-white">{post.title}</h2>
                  <p className="text-gray-300 mb-4">{post.content}</p>
                  <div className="flex items-center gap-4 pt-3 border-t border-gray-800">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Heart size={20} />
                      <span className="font-medium">{post.likes}</span>
                    </div>
                    <button
                      onClick={() => handleEdit(post)}
                      className="flex items-center gap-2 text-gray-500 hover:text-white transition"
                    >
                      <Edit2 size={18} />
                      <span className="text-sm font-medium">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="flex items-center gap-2 text-gray-500 hover:text-white transition"
                    >
                      <Trash2 size={18} />
                      <span className="text-sm font-medium">Delete</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}