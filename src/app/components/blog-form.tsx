'use client';

import { useState, useEffect } from 'react';

interface BlogFormProps {
  onSubmit: (post: { title: string; content: string; tags: string[] }) => Promise<void>;
  initial?: { title?: string; content?: string; tags?: string[] };
  submitLabel?: string;
  onCancel?: () => void;
}

export function BlogForm({ onSubmit, initial, submitLabel = 'Submit Post', onCancel }: BlogFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [content, setContent] = useState(initial?.content ?? '');
  const [tags, setTags] = useState((initial?.tags ?? []).join(', '));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ title?: string; content?: string }>({});

  useEffect(() => {
    // update fields when initial changes (edit mode)
    if (initial) {
      setTitle(initial.title ?? '');
      setContent(initial.content ?? '');
      setTags((initial.tags ?? []).join(', '));
    }
  }, [initial]);

  const validate = () => {
    const errors: { title?: string; content?: string } = {};
    if (!title || title.trim().length < 3) errors.title = 'Title must be at least 3 characters.';
    if (!content || content.trim().length < 10) errors.content = 'Content must be at least 10 characters.';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      await onSubmit({
        title: title.trim(),
        content: content.trim(),
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean)
      });

      // Reset only when not in edit mode
      if (!initial) {
        setTitle('');
        setContent('');
        setTags('');
      }
      if (onCancel) onCancel();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

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
          minLength={3}
          maxLength={100}
        />
        {fieldErrors.title && <p className="mt-1 text-sm text-red-600">{fieldErrors.title}</p>}
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
          required
          minLength={10}
        />
        {fieldErrors.content && <p className="mt-1 text-sm text-red-600">{fieldErrors.content}</p>}
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
          placeholder="e.g., technology, coding, web development"
        />
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