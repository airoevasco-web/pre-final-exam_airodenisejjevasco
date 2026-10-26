
import { useState } from 'react'
import type { Product } from './types'
import { initialProducts } from './data/products'
import AddProductForm from './AddProductForm'
import ProductDetail from './ProductDetail'

function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const categories = [
    'All',
    ...new Set(products.map((product) => product.category)),
  ]

  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === 'All' ||
      product.category === selectedCategory,
  )

  const total = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  )

  function updateQuantity(id: number, change: number) {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: Math.max(0, product.quantity + change),
              cartQuantity: Math.min(
                product.cartQuantity,
                Math.max(0, product.quantity + change),
              ),
            }
          : product,
      ),
    )
  }

  function addToCart(id: number) {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id && product.cartQuantity < product.quantity
          ? { ...product, cartQuantity: product.cartQuantity + 1 }
          : product,
      ),
    )
  }

  function handleAddProduct(newProduct: Product) {
    setProducts((currentProducts) => [...currentProducts, newProduct])
  }

  return (
    <main className="min-h-screen bg-pink-50 px-4 py-8 text-gray-900 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 rounded-2xl bg-pink-200 p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-widest text-pink-900">
            Pre-Final Exam
          </p>

          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Product Management App
          </h1>

          <p className="mt-2 text-gray-700">
            Manage products, monitor stock, and calculate product totals.
          </p>
        </header>

        <section className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold">Product Inventory</h2>
            <p className="mt-1 text-sm text-gray-500">
              {products.length} products available
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="category" className="font-medium">
              Category:
            </label>

            <select
              id="category"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="rounded-lg border border-pink-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-pink-400"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full bg-gray-100 object-cover"
              />

              <div className="space-y-3 p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xl font-bold">{product.name}</h3>

                  <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-800">
                    {product.category}
                  </span>
                </div>

                <p className="text-sm text-gray-600">
                  {product.description}
                </p>

                <p className="text-sm text-amber-600">
                  Rating: {product.rating} / 5 ⭐
                </p>

                <p className="text-sm text-gray-600">
                  Stock:{' '}
                  <span className="font-semibold">{product.quantity}</span>
                </p>

                {product.quantity < 5 && (
                  <p className="rounded-lg bg-red-100 px-3 py-2 text-sm font-bold text-red-700">
                    Low Stock
                  </p>
                )}

                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                  <span className="text-gray-600">Price</span>

                  <span className="font-semibold">
                    ₱
                    {product.price.toLocaleString('en-PH', {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal</span>

                  <span className="text-lg font-bold text-pink-700">
                    ₱
                    {(product.price * product.quantity).toLocaleString(
                      'en-PH',
                      { minimumFractionDigits: 2 },
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium">Adjust stock</span>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, -1)}
                      disabled={product.quantity === 0}
                      className="h-9 w-9 rounded-lg bg-gray-200 font-bold disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label={`Decrease ${product.name} stock`}
                    >
                      −
                    </button>

                    <span className="min-w-4 text-center">
                      {product.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, 1)}
                      className="h-9 w-9 rounded-lg bg-pink-200 font-bold hover:bg-pink-300"
                      aria-label={`Increase ${product.name} stock`}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => addToCart(product.id)}
                  disabled={
                    product.quantity === 0 ||
                    product.cartQuantity >= product.quantity
                  }
                  className="w-full rounded-lg bg-gray-900 px-4 py-3 font-semibold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {product.quantity === 0
                    ? 'Out of Stock'
                    : product.cartQuantity >= product.quantity
                      ? 'Stock Limit Reached'
                      : 'Add to Cart'}
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedProduct(product)}
                  className="w-full rounded-lg border border-pink-300 px-4 py-3 font-semibold text-pink-700 transition hover:bg-pink-50"
                >
                  View Details
                </button>

                <p className="text-sm text-gray-600">
                  In cart: {product.cartQuantity}
                </p>
              </div>
            </article>
          ))}
        </section>

        {filteredProducts.length === 0 && (
          <p className="mt-6 rounded-xl bg-white p-6 text-center text-gray-500">
            No products found in this category.
          </p>
        )}

        <section className="mt-8 rounded-2xl bg-gray-900 p-6 text-white shadow-lg">
          <h2 className="text-xl font-bold">Inventory Summary</h2>

          <p className="mt-3 text-gray-300">Total inventory value</p>

          <p className="mt-1 text-3xl font-bold text-pink-300">
            ₱
            {total.toLocaleString('en-PH', {
              minimumFractionDigits: 2,
            })}
          </p>

          <p className="mt-2 text-sm text-gray-300">
            Based on current stock quantities and product prices.
          </p>
        </section>

        <AddProductForm onAddProduct={handleAddProduct} />

        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </main>
  )
}

export default App
