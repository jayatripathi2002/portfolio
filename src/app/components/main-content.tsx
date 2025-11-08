'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { BlogForm } from './blog-form';
import { ProgressForm } from './progress-form';

// Types
interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string[];
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
}

interface Certification {
  name: string;
  provider: string;
  date: string;
}

const experiences: Experience[] = [
  {
    title: "Jr. Software Engineer",
    company: "Sterling Auxiliaries Pvt. Ltd.",
    duration: "Aug 2024 - Aug 2025",
    description: [
      "Worked on SharePoint-based sites, Sustainability Portal, and Compliance System for document management and accessibility across departments.",
      "Developed and delivered the PRAANA website to highlight organizational achievements, sustainability initiatives, and growth milestones.",
      "Contributed to 5S digital process implementation, creating automation and dashboards to track efficiency and progress in the factory.",
      "Collaborated with a cross-functional team of 8–10 members, including EHS, HR, Operations, and Project Managers."
    ]
  },
  {
    title: "Software Developer Intern",
    company: "Reserve Bank Information Technology",
    duration: "May 2024 - Aug 2024",
    description: [
      "Projects: Real-Time Financial Data Tracker, Automated Reporting System"
    ]
  },
  {
    title: "Software Developer Intern",
    company: "IIT Bombay",
    duration: "Dec 2023 - Apr 2024",
    description: [
      "Worked on various projects under the 'NanoScience-Bios Lab' and tested numerous web applications",
      "Projects: IoT Management, PDF Extractor"
    ]
  }
];

const projects: Project[] = [
  {
    name: "Auction System",
    description: "A full-stack auction system with real-time bidding capabilities",
    technologies: ["React", "Node.js", "Socket.IO", "MongoDB"]
  },
  {
    name: "Hospital Management System",
    description: "Comprehensive hospital management solution with patient records and appointment scheduling",
    technologies: ["Next.js", "TypeScript", "PostgreSQL"]
  },
  {
    name: "Expense Tracker and Predictive Analysis",
    description: "Personal finance management tool with ML-powered expense predictions",
    technologies: ["Python", "React", "TensorFlow", "Firebase"]
  }
];

const certifications: Certification[] = [
  {
    name: "MERN Stack Development",
    provider: "NullClass",
    date: "2024"
  },
  {
    name: "FullStack Web Development (MERN)",
    provider: "Udemy",
    date: "2024"
  },
  {
    name: "FullStack Development",
    provider: "ExcelR",
    date: "2024"
  },
  {
    name: "Power BI",
    provider: "Tata NeuSkills",
    date: "2024"
  },
  {
    name: "SQL Fundamentals",
    provider: "Accenture",
    date: "2024"
  }
];

interface MainContentProps {
  selectedSection: string;
}

interface BlogPost {
  title: string;
  content: string;
  tags?: string[];
  createdAt: string;
  _id?: string;
}

interface ProgressUpdate {
  category: string;
  title: string;
  description: string;
  completedAt: string;
  links?: { title: string; url: string }[];
  _id?: string;
}

export default function MainContent({ selectedSection }: MainContentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [progressUpdates, setProgressUpdates] = useState<ProgressUpdate[]>([]);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [showProgressForm, setShowProgressForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [editingProgress, setEditingProgress] = useState<ProgressUpdate | null>(null);
  const { theme } = useTheme();

  // Helper: optimistic create, update, delete for blog
  const createBlogOptimistic = async (post: { title: string; content: string; tags: string[] }) => {
    // create a temporary item
    const tempId = `temp-${Date.now()}`;
    const tempItem: BlogPost = { title: post.title, content: post.content, tags: post.tags, createdAt: new Date().toISOString(), _id: tempId } as any;
    setBlogPosts(prev => [tempItem, ...prev]);

    try {
      const res = await fetch('/api/blog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(post) });
      if (!res.ok) throw new Error('Failed to create blog post');
      const created = await res.json();
      // replace temp with created
      setBlogPosts(prev => prev.map(p => (p._id === tempId ? created : p)));
    } catch (err) {
      // rollback
      setBlogPosts(prev => prev.filter(p => p._id !== tempId));
      throw err;
    }
  };

  const updateBlogOptimistic = async (id: string, data: Partial<BlogPost>) => {
    const previous = blogPosts;
    setBlogPosts(prev => prev.map(p => (p._id === id ? { ...p, ...data } as any : p)));
    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error('Failed to update blog post');
      const updated = await res.json();
      setBlogPosts(prev => prev.map(p => (p._id === id ? updated : p)));
    } catch (err) {
      setBlogPosts(previous);
      throw err;
    }
  };

  const deleteBlogOptimistic = async (id: string) => {
    const previous = blogPosts;
    setBlogPosts(prev => prev.filter(p => p._id !== id));
    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete blog post');
    } catch (err) {
      setBlogPosts(previous);
      throw err;
    }
  };

  // Helpers for progress
  const createProgressOptimistic = async (update: any) => {
    const tempId = `temp-${Date.now()}`;
    const tempItem: ProgressUpdate = { ...update, completedAt: new Date().toISOString(), _id: tempId } as any;
    setProgressUpdates(prev => [tempItem, ...prev]);
    try {
      const res = await fetch('/api/progress', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(update) });
      if (!res.ok) throw new Error('Failed to create progress update');
      const created = await res.json();
      setProgressUpdates(prev => prev.map(p => (p._id === tempId ? created : p)));
    } catch (err) {
      setProgressUpdates(prev => prev.filter(p => p._id !== tempId));
      throw err;
    }
  };

  const updateProgressOptimistic = async (id: string, data: Partial<ProgressUpdate>) => {
    const previous = progressUpdates;
    setProgressUpdates(prev => prev.map(p => (p._id === id ? { ...p, ...data } as any : p)));
    try {
      const res = await fetch(`/api/progress/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error('Failed to update progress update');
      const updated = await res.json();
      setProgressUpdates(prev => prev.map(p => (p._id === id ? updated : p)));
    } catch (err) {
      setProgressUpdates(previous);
      throw err;
    }
  };

  const deleteProgressOptimistic = async (id: string) => {
    const previous = progressUpdates;
    setProgressUpdates(prev => prev.filter(p => p._id !== id));
    try {
      const res = await fetch(`/api/progress/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete progress update');
    } catch (err) {
      setProgressUpdates(previous);
      throw err;
    }
  };

  // Fetch blog posts and progress updates when those sections are selected
  useEffect(() => {
    async function fetchData() {
      if (selectedSection === 'blog') {
        setIsLoading(true);
        try {
          const res = await fetch('/api/blog');
          if (!res.ok) throw new Error('Failed to fetch blog posts');
          const data = await res.json();
          setBlogPosts(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Error fetching blog posts');
        } finally {
          setIsLoading(false);
        }
      } else if (selectedSection === 'progress') {
        setIsLoading(true);
        try {
          const res = await fetch('/api/progress');
          if (!res.ok) throw new Error('Failed to fetch progress updates');
          const data = await res.json();
          setProgressUpdates(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Error fetching progress updates');
        } finally {
          setIsLoading(false);
        }
      }
    }
    
    fetchData();
  }, [selectedSection]);

  // Error boundary UI
  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => setError(null)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-8">
        {selectedSection === 'about' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">About Me</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Results-driven B.Tech (IT) graduate with strong expertise in Full-Stack Development and Data Analytics, 
              backed by hands-on project experience and multiple internships. Proficient in building scalable web applications, 
              optimizing databases, and applying data-driven insights.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Contact</h2>
                <p className="text-gray-600 dark:text-gray-300">📍 Mumbai, Maharashtra</p>
                <p className="text-gray-600 dark:text-gray-300">📧 jaya.tripathi.tech@gmail.com</p>
                <p className="text-gray-600 dark:text-gray-300">📱 +91 8369714732</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Education</h2>
                <p className="text-gray-600 dark:text-gray-300">B.Tech in Information Technology</p>
                <p className="text-gray-600 dark:text-gray-300">Mumbai University</p>
                <p className="text-gray-600 dark:text-gray-300">CGPA: 8.9</p>
              </div>
            </div>
          </motion.div>
        )}

        {selectedSection === 'experience' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">Experience</h1>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{exp.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{exp.company} • {exp.duration}</p>
                  <ul className="list-disc list-inside space-y-2">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="text-gray-600 dark:text-gray-300">{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {selectedSection === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{project.name}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {selectedSection === 'certifications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">Certifications</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{cert.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{cert.provider}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{cert.date}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {selectedSection === 'blog' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Blog</h1>
              <button
                onClick={() => setShowBlogForm(prev => !prev)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                {showBlogForm ? 'Cancel' : 'New Post'}
              </button>
            </div>
            
            {showBlogForm && (
              <div className="mb-8">
                <BlogForm
                  initial={editingBlog ?? undefined}
                  submitLabel={editingBlog ? 'Update Post' : 'Create Post'}
                  onCancel={() => { setShowBlogForm(false); setEditingBlog(null); }}
                  onSubmit={async (post) => {
                    if (editingBlog && editingBlog._id && !editingBlog._id.startsWith('temp-')) {
                      // edit
                      await updateBlogOptimistic(editingBlog._id, post as any);
                      setEditingBlog(null);
                      setShowBlogForm(false);
                    } else {
                      // create (optimistic)
                      await createBlogOptimistic(post);
                      setShowBlogForm(false);
                      setEditingBlog(null);
                    }
                  }}
                />
              </div>
            )}

            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : blogPosts.length > 0 ? (
              <div className="grid gap-6">
                {blogPosts.map((post: any, index: number) => (
                  <article key={post._id ?? index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{post.title}</h2>
                        <p className="text-gray-600 dark:text-gray-300">{post.content}</p>
                        {post.tags && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {post.tags.map((tag: string, i: number) => (
                              <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="ml-4 flex flex-col gap-2">
                        <button
                          onClick={() => { setEditingBlog(post); setShowBlogForm(true); }}
                          className="text-sm text-indigo-600 hover:text-indigo-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={async () => {
                            try {
                              await deleteBlogOptimistic(post._id);
                            } catch (err) {
                              setError(err instanceof Error ? err.message : 'Delete failed');
                            }
                          }}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-300">No blog posts yet. Check back soon!</p>
            )}
          </motion.div>
        )}

        {selectedSection === 'progress' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Learning Progress</h1>
              <button
                onClick={() => setShowProgressForm(prev => !prev)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                {showProgressForm ? 'Cancel' : 'Add Progress'}
              </button>
            </div>

            {showProgressForm && (
              <div className="mb-8">
                <ProgressForm
                  initial={editingProgress ?? undefined}
                  submitLabel={editingProgress ? 'Update Progress' : 'Add Progress'}
                  onCancel={() => { setShowProgressForm(false); setEditingProgress(null); }}
                  onSubmit={async (update) => {
                    if (editingProgress && editingProgress._id && !editingProgress._id.startsWith('temp-')) {
                      await updateProgressOptimistic(editingProgress._id, update as any);
                      setEditingProgress(null);
                      setShowProgressForm(false);
                    } else {
                      await createProgressOptimistic(update);
                      setShowProgressForm(false);
                      setEditingProgress(null);
                    }
                  }}
                />
              </div>
            )}

            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : progressUpdates.length > 0 ? (
              <div className="grid gap-6">
                {progressUpdates.map((update: any, index: number) => (
                  <div key={update._id ?? index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                            {update.category}
                          </span>
                          <time className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(update.completedAt).toLocaleDateString()}
                          </time>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{update.title}</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{update.description}</p>
                        {update.links && update.links.length > 0 && (
                          <div className="space-y-2">
                            {update.links.map((link: { title: string, url: string }, i: number) => (
                              <a
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                              >
                                {link.title} →
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="ml-4 flex flex-col gap-2">
                        <button
                          onClick={() => { setEditingProgress(update); setShowProgressForm(true); }}
                          className="text-sm text-indigo-600 hover:text-indigo-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={async () => {
                            try {
                              await deleteProgressOptimistic(update._id);
                            } catch (err) {
                              setError(err instanceof Error ? err.message : 'Delete failed');
                            }
                          }}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-300">No progress updates yet. Start tracking your learning journey!</p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}