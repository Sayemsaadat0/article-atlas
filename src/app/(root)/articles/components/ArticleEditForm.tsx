'use client';

import { useState, useCallback } from 'react';
import {
    Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog';
import { EditIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useArticlesStore } from '@/store/useArticles';
import Button from '@/components/ui/button';

type ArticleEditFormProps = {
    articleId: string;
};

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
    status: Yup.string().oneOf(['published', 'draft']).required('Status is required'),
});

const ArticleEditForm: React.FC<ArticleEditFormProps> = ({ articleId }) => {
    const { articles, updateArticle } = useArticlesStore();
    const [open, setOpen] = useState(false);

    const article = articles.find((a) => a.id === articleId);

    const handleSubmit = useCallback(
        (values: any) => {
            updateArticle(articleId, values);
            toast.success('Article updated successfully!');
            setOpen(false);

        },
        [articleId, updateArticle]
    );

    if (!article) return null;


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="cursor-pointer text-black-500 hover:text-black transition flex items-center gap-1">
                    <EditIcon size={20} />
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Article</DialogTitle>
                    <DialogDescription>Update the article details below.</DialogDescription>
                </DialogHeader>

                <Formik
                    initialValues={{
                        title: article.title,
                        content: article.content || '',
                        status: article.status, // "published" or "draft"
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, setFieldValue, isSubmitting }) => (
                        <Form className="space-y-4">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium">Title</label>
                                <Field
                                    name="title"
                                    className="w-full border p-2 rounded"
                                    placeholder="Enter title"
                                />
                                <ErrorMessage
                                    name="title"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            {/* Content */}
                            <div>
                                <label className="block text-sm font-medium">Content</label>
                                <Field
                                    as="textarea"
                                    name="content"
                                    className="w-full border p-2 rounded"
                                    rows={4}
                                    placeholder="Enter content"
                                />
                                <ErrorMessage
                                    name="content"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            {/* Status with Checkboxes */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Status</label>
                                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={values.status === 'published'}
                                        onChange={() =>
                                            setFieldValue('status', values.status === 'published' ? 'draft' : 'published')
                                        }
                                        className="form-checkbox h-5 w-5 text-blue-600"
                                    />
                                    <span>{values.status === 'published' ? 'Published' : 'Draft'}</span>
                                </label>
                                <ErrorMessage
                                    name="status"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>


                            {/* Actions */}
                            <div className="flex justify-end gap-2">
                                <Button label="Cancel" variant="outline" onClick={() => setOpen(false)} />
                                <Button
                                    type="submit"
                                    label={isSubmitting ? 'Saving...' : 'Save Changes'}
                                    className="bg-blue-500 text-white hover:bg-blue-600"
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
};

export default ArticleEditForm;
