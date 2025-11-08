'use client';

import { useState, useEffect } from 'react';

interface ProgressFormProps {
  onSubmit: (update: {
    category: string;
    title: string;
    description: string;
    links: { title: string; url: string }[];
  }) => Promise<void>;
  initial?: {
    category?: string;
    title?: string;
    description?: string;
    links?: { title: string; url: string }[];
  };
  submitLabel?: string;
  onCancel?: () => void;
}

export function ProgressForm({ onSubmit, initial, submitLabel = 'Submit Progress', onCancel }: ProgressFormProps) {
  const [category, setCategory] = useState(initial?.category ?? '');
  const [title, setTitle] = useState(initial?.title ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [links, setLinks] = useState<{ title: string; url: string }[]>(initial?.links && initial.links.length ? initial.links : [{ title: '', url: '' }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ category?: string; title?: string; description?: string }>({});

  const categories = ['DSA', 'LeetCode', 'Python', 'Courses'];

  useEffect(() => {
    if (initial) {
      setCategory(initial.category ?? '');
      setTitle(initial.title ?? '');
      setDescription(initial.description ?? '');
      setLinks(initial.links && initial.links.length ? initial.links : [{ title: '', url: '' }]);
    }
  }, [initial]);

  const validate = () => {
    const errors: { category?: string; title?: string; description?: string } = {};
    if (!category) errors.category = 'Please choose a category.';
    if (!title || title.trim().length < 3) errors.title = 'Title must be at least 3 characters.';
    if (!description || description.trim().length < 10) errors.description = 'Description must be at least 10 characters.';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      // Filter out empty links
      const validLinks = links.filter(link => link.title && link.url);
      
      await onSubmit({
        category,
        title: title.trim(),
        description: description.trim(),
        links: validLinks
      });

      // Reset only when not editing
      if (!initial) {
        setCategory('');
        setTitle('');
        setDescription('');
        setLinks([{ title: '', url: '' }]);
      }
      if (onCancel) onCancel();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit progress update');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addLink = () => {
    setLinks([...links, { title: '', url: '' }]);
  };

  const updateLink = (index: number, field: 'title' | 'url', value: string) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {fieldErrors.category && <p className="mt-1 text-sm text-red-600">{fieldErrors.category}</p>}
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
          required
        />
        {fieldErrors.title && <p className="mt-1 text-sm text-red-600">{fieldErrors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
          required
        />
        {fieldErrors.description && <p className="mt-1 text-sm text-red-600">{fieldErrors.description}</p>}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Related Links
          </label>
          <button
            type="button"
            onClick={addLink}
            className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400"
          >
            + Add Link
          </button>
        </div>
        
        {links.map((link, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Link Title"
                value={link.title}
                onChange={(e) => updateLink(index, 'title', e.target.value)}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm"
              />
            </div>
            <div className="flex-1">
              <input
                type="url"
                placeholder="URL"
                value={link.url}
                onChange={(e) => updateLink(index, 'url', e.target.value)}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm"
              />
            </div>
            {links.length > 1 && (
              <button
                type="button"
                onClick={() => removeLink(index)}
                className="text-red-500 hover:text-red-600"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Submitting...
            </>
          ) : (
            submitLabel
          )}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2 px-4 rounded-md border border-gray-300 dark:border-gray-600 text-sm bg-transparent"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}