"use client";

import React, { useState, useEffect } from 'react';
import {axiosClassic} from "@/api/interseptor";

interface Language {
    language_code: string;
    name: string;
}

interface TranslationContent {
    lang_code: string;
    content: {
        title: string;
        description: string;
    };
}

export interface Subcategory {
    translate_content: TranslationContent[];
    id: string;
    category_id: string;
    image: string;
    language: Language[];
    selectedLang?: string;
    is_active?: boolean;
    created_at: string;
}

interface Category {
    translate_content: TranslationContent[];
    id: string;
    subcategories: Subcategory[];
    image: string;
    language: Language[];
    selectedLang?: string;
    is_active?: boolean;
    created_at: string;
}

const DashboardClientComponent: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosClassic.get('/category-admin?page=1&page_size=100');
                setCategories(response.data.items);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div>
            <h1>Categories</h1>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        <h2>{category.translate_content?.find(content => content.lang_code === category.selectedLang)?.content.title || 'No Title'}</h2>
                        <p>{category.translate_content?.find(content => content.lang_code === category.selectedLang)?.content.description || 'No Description'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DashboardClientComponent;
