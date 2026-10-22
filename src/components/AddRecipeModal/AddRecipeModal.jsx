import { useState } from 'react';
import './AddRecipeModal.css';
import Button from '../Button/Button.jsx';

const INITIAL_FORM = {
    name: '',
    ingredients: '',
    instructions: '',
    prepTimeMinutes: '0',
    cookTimeMinutes: '0',
    servings: '2',
    difficulty: 'Easy',
    cuisine: '',
    tags: '',
    image: '',
    caloriesPerServing: '0',
};

function validateForm(form) {
    const errors = {};

    if (!form.name.trim()) {
        errors.name = 'Le nom de la recette est obligatoire.';
    }

    if (!form.cuisine.trim()) {
        errors.cuisine = 'Le type de cuisine est obligatoire.';
    }

    if (!form.ingredients.split('\n').some((item) => item.trim())) {
        errors.ingredients = 'Ajoute au moins un ingrédient.';
    }

    if (!form.instructions.split('\n').some((item) => item.trim())) {
        errors.instructions = 'Ajoute au moins une instruction.';
    }

    const numericFields = [
        ['prepTimeMinutes', 'Le temps de préparation'],
        ['cookTimeMinutes', 'Le temps de cuisson'],
        ['caloriesPerServing', 'Les calories'],
    ];

    for (const [field, label] of numericFields) {
        const value = Number(form[field]);

        if (!Number.isInteger(value) || value < 0) {
            errors[field] = `${label} doit être un entier positif ou nul.`;
        }
    }

    const servings = Number(form.servings);

    if (!Number.isInteger(servings) || servings < 1) {
        errors.servings = 'Le nombre de portions doit être supérieur à 0.';
    }

    if (form.image.trim()) {
        try {
            const imageUrl = new URL(form.image.trim());

            if (!['http:', 'https:'].includes(imageUrl.protocol)) {
                errors.image = "L'image doit utiliser une URL HTTP ou HTTPS.";
            }
        } catch {
            errors.image = "L'URL de l'image n'est pas valide.";
        }
    }

    return errors;
}

function toRecipe(form) {
    return {
        name: form.name.trim(),
        ingredients: form.ingredients
            .split('\n')
            .map((item) => item.trim())
            .filter(Boolean),
        instructions: form.instructions
            .split('\n')
            .map((item) => item.trim())
            .filter(Boolean),
        prepTimeMinutes: Number(form.prepTimeMinutes),
        cookTimeMinutes: Number(form.cookTimeMinutes),
        servings: Number(form.servings),
        difficulty: form.difficulty,
        cuisine: form.cuisine.trim(),
        tags: form.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean),
        image: form.image.trim(),
        caloriesPerServing: Number(form.caloriesPerServing),
        rating: 0,
        reviewCount: 0,
        mealType: [],
    };
}

export default function AddRecipeModal({ onClose, onSubmit }) {
    const [form, setForm] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    function handleChange(event) {
        const { name, value } = event.target;

        setForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));

        setErrors((currentErrors) => ({
            ...currentErrors,
            [name]: '',
        }));

        setSubmitError('');
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const validationErrors = validateForm(form);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setIsSubmitting(true);
        setSubmitError('');

        try {
            await onSubmit(toRecipe(form));
            setSuccessMessage("La recette a été ajoutée avec succès.");
        } catch (error) {
            setSubmitError(
                error.message || "Une erreur est survenue lors de l'ajout."
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div
            className="add-recipe-modal__overlay"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget && !isSubmitting) {
                    onClose();
                }
            }}
        >
            <section
                className="add-recipe-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="add-recipe-modal-title"
            >
                <button
                    type="button"
                    className="add-recipe-modal__close"
                    onClick={onClose}
                    disabled={isSubmitting}
                    aria-label="Fermer la fenêtre"
                >
                    ×
                </button>

                <h2 id="add-recipe-modal-title">Ajouter une recette</h2>

                <form onSubmit={handleSubmit} noValidate>
                    <label>
                        Nom de la recette *
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                        {errors.name && <span className="form-error">{errors.name}</span>}
                    </label>

                    <label>
                        Ingrédients * (un par ligne)
                        <textarea
                            name="ingredients"
                            value={form.ingredients}
                            onChange={handleChange}
                            rows={4}
                            required
                        />
                        {errors.ingredients && (
                            <span className="form-error">{errors.ingredients}</span>
                        )}
                    </label>

                    <label>
                        Instructions * (une étape par ligne)
                        <textarea
                            name="instructions"
                            value={form.instructions}
                            onChange={handleChange}
                            rows={4}
                            required
                        />
                        {errors.instructions && (
                            <span className="form-error">{errors.instructions}</span>
                        )}
                    </label>

                    <div className="add-recipe-modal__grid">
                        <label>
                            Préparation (minutes) *
                            <input
                                type="number"
                                name="prepTimeMinutes"
                                min="0"
                                step="1"
                                value={form.prepTimeMinutes}
                                onChange={handleChange}
                                required
                            />
                            {errors.prepTimeMinutes && (
                                <span className="form-error">{errors.prepTimeMinutes}</span>
                            )}
                        </label>

                        <label>
                            Cuisson (minutes) *
                            <input
                                type="number"
                                name="cookTimeMinutes"
                                min="0"
                                step="1"
                                value={form.cookTimeMinutes}
                                onChange={handleChange}
                                required
                            />
                            {errors.cookTimeMinutes && (
                                <span className="form-error">{errors.cookTimeMinutes}</span>
                            )}
                        </label>

                        <label>
                            Portions *
                            <input
                                type="number"
                                name="servings"
                                min="1"
                                step="1"
                                value={form.servings}
                                onChange={handleChange}
                                required
                            />
                            {errors.servings && (
                                <span className="form-error">{errors.servings}</span>
                            )}
                        </label>

                        <label>
                            Calories par portion
                            <input
                                type="number"
                                name="caloriesPerServing"
                                min="0"
                                step="1"
                                value={form.caloriesPerServing}
                                onChange={handleChange}
                            />
                            {errors.caloriesPerServing && (
                                <span className="form-error">{errors.caloriesPerServing}</span>
                            )}
                        </label>
                    </div>

                    <label>
                        Difficulté *
                        <select
                            name="difficulty"
                            value={form.difficulty}
                            onChange={handleChange}
                        >
                            <option value="Easy">Facile</option>
                            <option value="Medium">Moyenne</option>
                            <option value="Hard">Difficile</option>
                        </select>
                    </label>

                    <label>
                        Type de cuisine *
                        <input
                            name="cuisine"
                            value={form.cuisine}
                            onChange={handleChange}
                            placeholder="Ex. : Italian"
                            required
                        />
                        {errors.cuisine && (
                            <span className="form-error">{errors.cuisine}</span>
                        )}
                    </label>

                    <label>
                        Tags (séparés par des virgules)
                        <input
                            name="tags"
                            value={form.tags}
                            onChange={handleChange}
                            placeholder="Ex. : Vegetarian, Quick"
                        />
                    </label>

                    <label>
                        URL de l'image (facultative)
                        <input
                            type="url"
                            name="image"
                            value={form.image}
                            onChange={handleChange}
                            placeholder="https://..."
                        />
                        {errors.image && (
                            <span className="form-error">{errors.image}</span>
                        )}
                    </label>

                    {submitError && (
                        <p className="form-error" role="alert">
                            {submitError}
                        </p>
                    )}
                    {successMessage && (
                        <p className="success-message" role="status">
                            {successMessage}
                        </p>
                    )}

                    <div className="add-recipe-modal__actions">
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Création en cours...' : 'Créer la recette'}
                        </Button>

                        <Button variant="secondary" onClick={onClose}>
                            Annuler
                        </Button>
                    </div>
                </form>
            </section>
        </div>
    );
}