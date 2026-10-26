
import type { Product } from './types'

interface ProductDetailProps {
  product: Product
  onClose: () => void
}

function ProductDetail({ product, onClose }: ProductDetailProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
      <section className="my-8 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="mb-4 rounded-lg bg-gray-100 px-4 py-2 font-semibold transition hover:bg-pink-100"
        >
          ← Back to Products
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full rounded-xl bg-gray-100 object-cover"
        />

        <div className="mt-5 flex flex-wrap items-start justify-between gap-3">
          <h2 className="text-2xl font-bold text-gray-900">
            {product.name}
          </h2>

          <span className="rounded-full bg-pink-100 px-3 py-1 text-sm font-medium text-pink-800">
            {product.category}
          </span>
        </div>

        <p className="mt-3 text-gray-600">{product.description}</p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl bg-pink-50 p-4">
            <p className="text-sm text-gray-500">Price</p>
            <p className="mt-1 text-xl font-bold text-pink-700">
              ₱
              {product.price.toLocaleString('en-PH', {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>

          <div className="rounded-xl bg-pink-50 p-4">
            <p className="text-sm text-gray-500">Available Stock</p>
            <p className="mt-1 text-xl font-bold text-gray-900">
              {product.quantity}
            </p>

            {product.quantity < 5 && (
              <p className="mt-1 text-sm font-bold text-red-600">
                Low Stock
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-gray-50 p-4">
          <h3 className="font-bold text-gray-900">
            Product Specifications
          </h3>
          <p className="mt-2 text-gray-600">
            {product.specification}
          </p>
        </div>

        <div className="mt-4 rounded-xl bg-amber-50 p-4">
          <p className="font-semibold text-amber-700">
            Rating: {product.rating} / 5 ⭐
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-gray-900 px-4 py-3 font-semibold text-white transition hover:bg-pink-700"
        >
          Close Details
        </button>
      </section>
    </div>
  )
}

export default ProductDetail
