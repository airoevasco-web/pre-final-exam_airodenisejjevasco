
import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Product } from './types'

interface AddProductFormProps {
  onAddProduct: (product: Product) => void
}

function AddProductForm({ onAddProduct }: AddProductFormProps) {
  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Skincare')
  const [description, setDescription] = useState('')
  const [specification, setSpecification] = useState('')
  const [rating, setRating] = useState('4.5')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const numericRating = Number(rating)
    const numericPrice = Number(price)
    const numericQuantity = Number(quantity)

    if (
      !image.trim() ||
      !name.trim() ||
      !category.trim() ||
      !description.trim() ||
      !specification.trim() ||
      rating.trim() === '' ||
      price.trim() === '' ||
      quantity.trim() === ''
    ) {
      alert('Please fill in all fields.')
      return
    }

    if (!image.trim().startsWith('http')) {
      alert('Please enter a valid image URL starting with http:// or https://.')
      return
    }

    if (
      !Number.isFinite(numericRating) ||
      numericRating < 0 ||
      numericRating > 5 ||
      !Number.isFinite(numericPrice) ||
      numericPrice <= 0 ||
      !Number.isInteger(numericQuantity) ||
      numericQuantity < 0
    ) {
      alert('Rating must be 0–5, price must be above 0, and quantity must be a whole number of 0 or more.')
      return
    }

    const newProduct: Product = {
      id: Date.now(),
      image: image.trim(),
      name: name.trim(),
      category: category.trim(),
      description: description.trim(),
      specification: specification.trim(),
      rating: numericRating,
      price: numericPrice,
      quantity: numericQuantity,
      cartQuantity: 0,
    }

    onAddProduct(newProduct)

    setImage('')
    setName('')
    setCategory('Skincare')
    setDescription('')
    setSpecification('')
    setRating('4.5')
    setPrice('')
    setQuantity('')

    alert('Product added successfully!')
  }

  const inputClass =
    'w-full rounded-lg border border-pink-200 bg-white px-3 py-2 text-gray-900 outline-none focus:ring-2 focus:ring-pink-400'

  return (
    <section className="mt-8 rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold">Add New Product</h2>
      <p className="mb-5 mt-1 text-sm text-gray-500">
        Add a skincare, makeup, or clothing product to your shop.
      </p>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <label className="space-y-1">
          <span className="block font-medium">Feature Image URL</span>
          <input
            className={inputClass}
            type="url"
            placeholder="https://example.com/product.jpg"
            value={image}
            onChange={(event) => setImage(event.target.value)}
            required
          />
        </label>

        <label className="space-y-1">
          <span className="block font-medium">Product Name</span>
          <input
            className={inputClass}
            type="text"
            placeholder="e.g. Rose Blush"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>

        <label className="space-y-1">
          <span className="block font-medium">Product Category</span>
          <select
            className={inputClass}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
          >
            <option value="Skincare">Skincare</option>
            <option value="Makeup">Makeup</option>
            <option value="Clothes">Clothes</option>
          </select>
        </label>

        <label className="space-y-1">
          <span className="block font-medium">Rating (0–5)</span>
          <input
            className={inputClass}
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
            required
          />
        </label>

        <label className="space-y-1">
          <span className="block font-medium">Price (₱)</span>
          <input
            className={inputClass}
            type="number"
            min="0.01"
            step="0.01"
            placeholder="450.00"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
          />
        </label>

        <label className="space-y-1">
          <span className="block font-medium">Quantity</span>
          <input
            className={inputClass}
            type="number"
            min="0"
            step="1"
            placeholder="10"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            required
          />
        </label>

        <label className="space-y-1 sm:col-span-2">
          <span className="block font-medium">Description</span>
          <textarea
            className={inputClass}
            rows={2}
            placeholder="Describe the product"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </label>

        <label className="space-y-1 sm:col-span-2">
          <span className="block font-medium">Product Specification</span>
          <textarea
            className={inputClass}
            rows={2}
            placeholder="List product specifications"
            value={specification}
            onChange={(event) => setSpecification(event.target.value)}
            required
          />
        </label>

        <button
          type="submit"
          className="rounded-lg bg-pink-600 px-5 py-3 font-semibold text-white transition hover:bg-pink-700 sm:col-span-2"
        >
          Add Product
        </button>
      </form>
    </section>
  )
}

export default AddProductForm
