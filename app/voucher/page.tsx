"use client";

import { useCart, OrderData } from "../../components/context/CartContext"; 
import Link from "next/link";
import { FaDownload, FaCheckCircle, FaShippingFast } from "react-icons/fa";

export default function VoucherPage() {
  const { lastOrder } = useCart();

  // Downloads/prints only the Invoice container
  const handleDownloadPDF = () => {
    window.print();
  };

  // If user visits /voucher directly with no active order
  if (!lastOrder) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-5 text-center bg-gray-50">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">No recent order found!</h2>
        <p className="text-ring mb-6">Please place an order to view the invoice.</p>
        <Link href="/" className="bg-primary text-white px-6 py-2.5 rounded-lg hover:opacity-90 transition">
          Return to Home
        </Link>
      </div>
    );
  }

  // Extract order/invoice number safely for tracking
  const orderNumber = lastOrder.invoiceNo || lastOrder.orderId || lastOrder.id || "";

  return (
    <>
      {/* CSS to isolate and print ONLY the invoice container */}
      <style jsx global>{`
        @media print {
          @page {
            size: auto;
            margin: 0;
          }

          html, body {
            height: 100%;
            overflow: hidden !important;
          }

          body * {
            visibility: hidden !important;
          }
          
          #invoice-container, #invoice-container * {
            visibility: visible !important;
          }

          #invoice-container {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-height: 100vh !important;
            padding: 24px !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          #invoice-container table td,
          #invoice-container table th {
            padding-top: 4px !important;
            padding-bottom: 4px !important;
          }

          #invoice-container .py-6 {
            padding-top: 12px !important;
            padding-bottom: 12px !important;
          }

          #invoice-container .mt-10 {
            margin-top: 16px !important;
          }
        }
      `}</style>

      <div className="bg-background min-h-screen py-10 px-4">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Success Header Message */}
          <div className="bg-background p-6 rounded-2xl shadow-sm text-center border">
            <FaCheckCircle className="text-primary text-5xl mx-auto mb-3" />
            <h1 className="text-2xl font-bold text-text-primary">Thank You For Your Order!</h1>
            <p className="text-ring text-sm mt-1">A confirmation voucher has been generated for your order.</p>

            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 bg-primary text-text-secondary px-5 py-2.5 rounded-xl font-medium hover:opacity-90 transition cursor-pointer text-sm"
              >
                <FaDownload /> Download / Save PDF
              </button>

              <Link
                href={`/git `}
                className="flex items-center gap-2 bg-destructive hover:bg-destructive/80 text-text-secondary px-5 py-2.5 rounded-xl font-medium transition text-sm"
              >
                <FaShippingFast /> Track Product
              </Link>

              <Link
                href="/"
                className="border px-5 py-2.5 rounded-xl text-ring font-medium hover:bg-background transition text-sm"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Printable Invoice Container */}
          <div 
            id="invoice-container" 
            className="bg-background p-8 rounded-2xl shadow-sm border text-text-primary"
          >
            {/* Invoice Top Header */}
            <div className="flex justify-between items-start border-b pb-6">
              <div>
                <h2 className="text-2xl font-bold text-primary">INVOICE</h2>
                <p className="text-sm text-ring font-medium mt-1">
                  Invoice No: <span className="text-text-primary">{lastOrder.invoiceNo}</span>
                </p>
                <p className="text-sm text-ring font-medium">
                  Date: <span className="text-text-primary">{lastOrder.orderDate}</span>
                </p>
              </div>
              <div className="text-right">
                <h3 className="font-bold text-lg">Taskco Cosmetic Store</h3>
                <p className="text-xs text-ring">Dhaka, Bangladesh</p>
                <p className="text-xs text-ring">ask@taskco.oi</p>
              </div>``
            </div>

            {/* Customer & Payment Info */}
            <div className="grid grid-cols-2 gap-6 py-6 border-b text-sm">
              <div>
                <h4 className="font-semibold text-ring mb-2">Billed To:</h4>
                <p className="font-bold">{lastOrder.customer?.fullName}</p>
                <p className="text-ring">{lastOrder.customer?.address}</p>
                <p className="text-ring">
                  {lastOrder.customer?.thana && `${lastOrder.customer.thana}, `}
                  {lastOrder.customer?.district}
                </p>
                <p className="text-ring">Phone: {lastOrder.customer?.phone}</p>
              </div>
              <div className="text-right">
                <h4 className="font-semibold text-text-primary mb-2">Payment Method:</h4>
                <p className="font-bold uppercase text-primary">{lastOrder.paymentMethod}</p>
                {lastOrder.notes && (
                  <div className="mt-3">
                    <h4 className="font-semibold text-text-primary">Notes:</h4>
                    <p className="text-ring italic">{lastOrder.notes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Items Table */}
            <div className="py-6 border-b">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-ring font-medium pb-2">
                    <th className="py-2">Item Description</th>
                    <th className="text-center py-2">Qty</th>
                    <th className="text-right py-2">Price</th>
                    <th className="text-right py-2">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-background">
                  {lastOrder.items?.map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 font-medium">
                        {item.name} {item.size ? `(${item.size})` : ""}
                      </td>
                      <td className="text-center py-3">{item.quantity}</td>
                      <td className="text-right py-3">৳{item.price?.toLocaleString()}</td>
                      <td className="text-right py-3 font-medium">
                        ৳{(item.price * item.quantity)?.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Price Calculations */}
            <div className="pt-6 flex justify-end">
              <div className="w-full sm:w-1/2 space-y-2 text-sm">
                <div className="flex justify-between text-ring">
                  <span>Subtotal:</span>
                  <span>৳{lastOrder.subtotal?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-ring">
                  <span>Delivery Charge:</span>
                  <span>৳{lastOrder.deliveryCharge || 0}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg text-text-primary">
                  <span>Total Amount:</span>
                  <span className="text-primary">৳{lastOrder.grandTotal?.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-10 border-t pt-4 text-center text-xs text-ring">
              Thank you for shopping with Taskco's Fashion! If you have any questions, please contact our support.
            </div>

          </div>
        </div>
      </div>
    </>
  );
}