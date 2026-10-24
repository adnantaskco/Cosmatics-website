"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/context/CartContext";
import Link from "next/link";
import {
  FaTrash,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa6";

export default function CheckoutPage() {
  const router = useRouter();

  // Remapped Context variables
  const {
    cartItems: cart = [],
    totalItems = 0,
    removeFromCart,
    increaseQuantity: increaseQty,
    decreaseQuantity: decreaseQty,
    clearCart,
    totalPrice = 0,
    setLastOrder,
  } = useCart();

  // Location & Payment state
  const [location, setLocation] = useState("dhaka");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [couponOpen, setCouponOpen] = useState(false);
  const [useDifferentBilling, setUseDifferentBilling] = useState(false);

  // Form State
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("Dhaka");
  const [thana, setThana] = useState("");
  const [notes, setNotes] = useState("");

  const deliveryCharge =
    totalItems > 0 ? (location === "dhaka" ? 100 : 180) : 0;
  const grandTotal = totalPrice + deliveryCharge;

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!fullName || !phone || !address) {
      alert("Please fill in required fields (Full Name, Phone, Address).");
      return;
    }

    // Generate unique Invoice ID
    const invoiceNo = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    // Construct order object for Voucher
    const orderData = {
      invoiceNo,
      orderId: invoiceNo,
      orderDate: today,
      customer: {
        fullName,
        phone,
        address,
        district,
        thana,
      },
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
      })),
      paymentMethod: paymentMethod === "cod" ? "Cash On Delivery" : paymentMethod,
      notes,
      subtotal: totalPrice,
      deliveryCharge,
      grandTotal,
    };

    // Save to context (and localStorage) & clear cart
    setLastOrder(orderData);
    clearCart();

    // Redirect to voucher page
    router.push("/voucher");
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-background border-b">
        <div className="max-w-7xl mx-auto py-8 text-center text-text-primary">
          <h1 className="text-4xl font-bold">Checkout</h1>

          <div className="mt-3 text-sm text-ring">
            <span>
              <Link href="/"> Home &gt; </Link>
            </span>
            <span className="text-primary">Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Login / Register Notice */}
        <div className="bg-ring/5 border rounded-xl px-5 py-3 flex justify-between items-center mb-6">
          <p className="text-sm text-text-primary">
            Have an account? Please login or register
          </p>

          <div className="flex gap-3">
            <Link href="/login">
              <button className="border cursor-pointer border-primary text-primary px-5 py-2 rounded-md text-sm">
                Login
              </button>
            </Link>
            <Link
              href="/signup"
              className="bg-primary text-text-secondary cursor-pointer px-5 py-2 rounded-md text-sm"
            >
              Register
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* LEFT SIDE: Shipping & Billing Form */}
          <div className="lg:col-span-1 space-y-5 lg:sticky lg:top-5 lg:self-start">
            {/* Shipping Address */}
            <div className="bg-background rounded-2xl border p-6">
              <h2 className="font-semibold text-text-primary text-lg border-l-4 border-primary pl-3 mb-5">
                Shipping Address
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your Full Name *"
                  className="h-12 border rounded-lg px-4 outline-none focus:border-primary"
                />

                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="017******** *"
                  className="h-12 border rounded-lg px-4 outline-none focus:border-primary"
                />

                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="ex: House no. / building / street / area *"
                  className="md:col-span-2 h-12 border rounded-lg px-4 outline-none focus:border-primary"
                />

                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="h-12 border rounded-lg px-4 outline-none text-text-primary"
                >
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chittagong">Chittagong</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Barisal">Barisal</option>
                  <option value="Rangpur">Rangpur</option>

                </select>

                <input
                  type="text"
                  value={thana}
                  onChange={(e) => setThana(e.target.value)}
                  placeholder="Thana / Upazila"
                  className="h-12 border rounded-lg px-4 outline-none focus:border-primary text-text-primary"
                />
              </div>
            </div>

            {/* Billing Address Option */}
            <div className="bg-background rounded-2xl border overflow-hidden">
              <div className="p-5">
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <h2 className="font-semibold text-lg text-text-primary border-l-4 border-primary pl-3">
                      Billing Address
                    </h2>

                    <p className="text-sm text-ring mt-1 ml-4">
                      Use a different billing address
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={useDifferentBilling}
                    onChange={(e) => setUseDifferentBilling(e.target.checked)}
                    className="w-5 h-5 accent-primary"
                  />
                </label>
              </div>

              {useDifferentBilling && (
                <div className="grid md:grid-cols-2 gap-4 p-5">
                  <input
                    type="text"
                    placeholder="Your Full Name *"
                    className="h-12 border rounded-lg px-4 outline-none focus:border-primary"
                  />

                  <input
                    type="text"
                    placeholder="017********"
                    className="h-12 border rounded-lg px-4 outline-none focus:border-primary"
                  />

                  <input
                    type="text"
                    placeholder="ex: House no. / building / street / area"
                    className="md:col-span-2 h-12 border rounded-lg px-4 outline-none focus:border-primary"
                  />

                  <select className="h-12 border rounded-lg px-4 outline-none text-text-primary">
                    <option>Select District</option>
                  </select>

                  <select className="h-12 border rounded-lg px-4 outline-none text-text-primary">
                    <option>Select Thana</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: Payment, Cart Review & Order Placement */}
          <div className="lg:col-span-2 space-y-5">
            {/* Payment Methods */}
            <div className="space-y-3 grid grid-cols-2 sm:grid-cols-3 gap-2 border p-4 rounded-3xl">
              {/* COD */}
              <label
                className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition ${
                  paymentMethod === "cod"
                    ? "border-primary bg-destructive/10"
                    : "border-ring"
                }`}
              >
                <div className="flex items-center gap-4 text-text-primary">
                  <img
                    src="https://ghorerbazar.com/assets/img/cod.svg"
                    alt="COD"
                    className="w-8 h-8 sm:w-5 sm:h-5 object-contain"
                  />
                  <span className="hidden sm:block">Cash On Delivery</span>
                </div>

                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="w-5 h-5 accent-primary"
                />
              </label>

              {/* Online */}
              <label
                className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer text-text-primary transition ${
                  paymentMethod === "online"
                    ? "border-primary bg-destructive/10"
                    : "border-ring/10"
                }`}
              >
                <div className="flex items-center gap-3 text-text-primary">
                  <img
                    src="https://ghorerbazar.com/assets/img/online-payment.svg"
                    alt="Online Payment"
                    className="w-10 h-10 sm:w-6 sm:h-6 object-contain"
                  />
                  <span className="hidden sm:block">Online Payment</span>
                </div>

                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                  className="w-5 h-5 accent-primary"
                />
              </label>

              {/* bKash */}
              <label
                className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition ${
                  paymentMethod === "bkash"
                    ? "border-primary bg-destructive/10"
                    : "border-ring/10"
                }`}
              >
                <div className="flex items-center gap-3 text-text-primary">
                  <img
                    src="https://ghorerbazar.com/assets/img/bkash.png"
                    alt="bKash"
                    className="w-10 h-10 sm:w-6 sm:h-6 object-contain"
                  />
                  <span className="hidden sm:block">bKash</span>
                </div>

                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "bkash"}
                  onChange={() => setPaymentMethod("bkash")}
                  className="w-5 h-5 accent-primary"
                />
              </label>
            </div>

            {/* Coupon Accordion */}
            <div className="bg-background rounded-2xl border overflow-hidden">
              <button
                onClick={() => setCouponOpen(!couponOpen)}
                className="w-full px-5 py-4 flex items-center justify-between font-medium text-text-primary"
              >
                <span>Have any coupon or gift voucher?</span>
                {couponOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>

              {couponOpen && (
                <div className="border-t p-5">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      className="flex-1 border rounded-lg px-4 py-3 outline-none"
                    />
                    <button className="bg-primary text-text-secondary px-5 rounded-lg">
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Review */}
            <div className="bg-background rounded-2xl border p-6 text-text-primary">
              <h2 className="font-semibold text-lg border-l-4 border-primary pl-3 mb-5">
                Order review
              </h2>

              {!cart || cart.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  Cart is empty
                </div>
              ) : (
                cart.map((item, index) => {
                  const qty = item.quantity ?? 1;
                  const itemKey = `${item.id}-${item.size || "default"}-${index}`;

                  return (
                    <div
                      key={itemKey}
                      className="grid grid-cols-12 items-center px-5 py-5 border-b hover:bg-ring/5 transition"
                    >
                      {/* PRODUCT */}
                      <div className="col-span-12 md:col-span-6 flex gap-4 items-center">
                        <img
                          src={item.image || "/placeholder.png"}
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded-lg border"
                        />

                        <div>
                          <h3 className="font-medium text-text-primary text-sm md:text-base">
                            {item.name}
                          </h3>
                          {item.size && (
                            <span className="text-xs text-gray-500 block">
                              Size: {item.size}
                            </span>
                          )}
                          <button
                            onClick={() => removeFromCart(item.id, item.size)}
                            className="text-destructive text-sm mt-1 flex items-center gap-1 hover:underline"
                          >
                            <FaTrash size={12} /> Remove
                          </button>
                        </div>
                      </div>

                      {/* PRICE */}
                      <div className="hidden md:block col-span-2 text-center text-ring">
                        ৳{item.price.toLocaleString()}
                      </div>

                      {/* QUANTITY */}
                      <div className="col-span-6 md:col-span-2 flex justify-start md:justify-center mt-3 md:mt-0">
                        <div className="flex items-center border rounded-lg overflow-hidden">
                          <button
                            onClick={() => {
                              if (qty > 1) {
                                decreaseQty(item.id, item.size);
                              }
                            }}
                            disabled={qty <= 1}
                            className={`px-3 py-1 transition ${
                              qty <= 1
                                ? "text-gray-300 cursor-not-allowed"
                                : "hover:bg-ring/20 active:scale-95"
                            }`}
                          >
                            <FaMinus size={12} />
                          </button>

                          <span className="px-4 text-sm">{qty}</span>

                          <button
                            onClick={() => increaseQty(item.id, item.size)}
                            className="px-3 py-1 hover:bg-ring/20 active:scale-95 transition"
                          >
                            <FaPlus size={12} />
                          </button>
                        </div>
                      </div>

                      {/* TOTAL */}
                      <div className="col-span-6 md:col-span-2 text-right text-text-primary font-semibold mt-3 md:mt-0">
                        ৳{(item.price * qty).toLocaleString()}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Price Summary */}
            <div className="bg-background rounded-2xl border p-5 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Total Items</span>
                <span>{totalItems.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Sub total</span>
                <span>৳ {totalPrice.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center text-gray-600">
                <span>Delivery Area</span>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="border rounded-md px-2 py-1 text-sm outline-none"
                >
                  <option value="dhaka">Inside Dhaka (৳100)</option>
                  <option value="outside">Outside Dhaka (৳180)</option>
                </select>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Delivery cost</span>
                <span>৳ {deliveryCharge}</span>
              </div>

              <div className="border-t mt-3 pt-4 flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>৳ {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Special Notes */}
            <div className="bg-background rounded-2xl border p-6 text-text-primary">
              <h2 className="font-semibold text-lg border-l-4 border-primary pl-3 mb-4">
                Special notes
                <span className="text-sm text-ring ml-2">(Optional)</span>
              </h2>

              <textarea
                rows={4}
                maxLength={90}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special instructions for delivery..."
                className="w-full border rounded-lg p-4 resize-none outline-none focus:border-primary"
              />

              <p className="text-xs text-ring mt-2">{notes.length} / 90 characters</p>
            </div>

            {/* Terms & Conditions Agreement */}
            <label className="flex items-start gap-3 text-sm text-text-primary cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="mt-1 accent-primary"
              />
              <span>
                I have read and agree to the
                <span className="text-primary font-medium">
                  {" "}Terms and Conditions, Privacy Policy & Refund and Return Policy
                </span>
              </span>
            </label>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-primary hover:opacity-90 text-text-secondary py-4 rounded-lg font-semibold cursor-pointer transition shadow-md"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}