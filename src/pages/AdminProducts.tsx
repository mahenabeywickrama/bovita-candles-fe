import { useEffect, useState } from "react"
import { createProduct, deleteProduct, getProducts, updateProduct, type ProductType } from "../services/product"

export default function AdminProducts() {
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingProductId, setEditingProductId] = useState<string | null>(null)

  // Form state
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    fragrance: "",
    size: "",
    price: "",
    stock: "",
  })
  const [images, setImages] = useState<FileList | null>(null)

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await getProducts(page, 10)
      setProducts(res.data)
      setTotalPages(res.totalPages)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [page])

  const handleCreate = async () => {
    if (!images || images.length === 0) {
        alert("Please select at least 1 image")
        return
    }

    const fd = new FormData()
    Object.entries(form).forEach(([key, value]) => fd.append(key, value))
    Array.from(images).forEach(img => fd.append("images", img))

    try {
        await createProduct(fd)

        // RESET FORM AFTER SUCCESS
        setForm({
        title: "",
        description: "",
        category: "",
        fragrance: "",
        size: "",
        price: "",
        stock: "",
        })

        setImages(null)

        // CLEAR ACTUAL FILE INPUT
        const fileInput = document.getElementById("product-images") as HTMLInputElement
        if (fileInput) fileInput.value = ""

        setShowAddModal(false)
        fetchProducts()

    } catch (err) {
        console.error(err)
        alert("Failed to create product")
    }
  }

  const handleOpenEdit = (product: ProductType) => {
    setEditingProductId(product._id)
    setForm({
      title: product.title,
      description: product.description,
      category: product.category,
      fragrance: product.fragrance,
      size: product.size,
      price: String(product.price),
      stock: String(product.stock),
    })
    setImages(null)
    setShowEditModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      await deleteProduct(id)
      fetchProducts()
    } catch (err) {
      console.error(err)
      alert("Failed to delete product")
    }
  }

  const handleUpdate = async () => {
    if (!editingProductId) return

    const fd = new FormData()
    Object.entries(form).forEach(([key, value]) => fd.append(key, value))

    // Optional new images
    if (images && images.length > 0) {
      Array.from(images).forEach(img => fd.append("images", img))
    }

    try {
      await updateProduct(editingProductId, fd)
      setShowEditModal(false)
      setEditingProductId(null)
      fetchProducts()
    } catch (err) {
      console.error(err)
      alert("Failed to update product")
    }
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add Product
        </button>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p._id} className="border rounded-lg shadow p-4">
              <img src={p.imageUrls[0]} alt={p.title} className="w-full h-40 object-cover rounded" />

              <h2 className="text-xl font-semibold mt-2">{p.title}</h2>
              <p className="text-gray-600">{p.category}</p>
              <p className="font-bold text-green-600 mt-1">${p.price}</p>
              <p className="text-sm text-gray-500">Stock: {p.stock}</p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleOpenEdit(p)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      <div className="flex justify-center gap-3 mt-6">
        <button
          disabled={page === 1}
          className="px-3 py-1 bg-gray-300 rounded disabled:bg-gray-200"
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>
        <span className="font-semibold">
          {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-300 rounded disabled:bg-gray-200"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

      {/* ADD PRODUCT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Title"
                className="p-2 border rounded"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              <textarea
                placeholder="Description"
                className="p-2 border rounded"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />

              <select
                className="p-2 border rounded"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="">Select Category</option>
                <option value="JAR">JAR</option>
                <option value="NORMAL">NORMAL</option>
                <option value="LUXURY">LUXURY</option>
              </select>

              <input
                type="text"
                placeholder="Fragrance (optional)"
                className="p-2 border rounded"
                value={form.fragrance}
                onChange={(e) => setForm({ ...form, fragrance: e.target.value })}
              />

              <input
                type="text"
                placeholder="Size"
                className="p-2 border rounded"
                value={form.size}
                onChange={(e) => setForm({ ...form, size: e.target.value })}
              />

              <input
                type="number"
                placeholder="Price"
                className="p-2 border rounded"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />

              <input
                type="number"
                placeholder="Stock"
                className="p-2 border rounded"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
              />

              <input
                id="product-images"
                type="file"
                multiple
                className="p-2 border rounded"
                onChange={(e) => setImages(e.target.files)}
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT PRODUCT MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

            <div className="flex flex-col gap-3">

              <input type="text" className="p-2 border rounded"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              <textarea className="p-2 border rounded"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />

              <select className="p-2 border rounded"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="JAR">JAR</option>
                <option value="NORMAL">NORMAL</option>
                <option value="LUXURY">LUXURY</option>
              </select>

              <input type="text" className="p-2 border rounded"
                value={form.fragrance}
                onChange={(e) => setForm({ ...form, fragrance: e.target.value })}
              />

              <input type="text" className="p-2 border rounded"
                value={form.size}
                onChange={(e) => setForm({ ...form, size: e.target.value })}
              />

              <input type="number" className="p-2 border rounded"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />

              <input type="number" className="p-2 border rounded"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
              />

              {/* OPTIONAL: New images */}
              <input type="file" multiple className="p-2 border rounded"
                onChange={(e) => setImages(e.target.files)}
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
