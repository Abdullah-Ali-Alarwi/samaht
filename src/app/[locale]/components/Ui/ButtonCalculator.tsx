"use client"
import React, { useState, useEffect, useRef } from "react"
import { CiCalculator2 } from "react-icons/ci";

export default function Header2() {
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [depth, setDepth] = useState("")
  const [result, setResult] = useState("")
  const [open, setOpen] = useState(false)

  const popoverRef = useRef<HTMLDivElement | null>(null)

  const handleCount = () => {
    const w = parseFloat(width) || 0
    const h = parseFloat(height) || 0
    const d = parseFloat(depth) || 0
    setResult((w * h * d).toString())
  }

  const handleReset = () => {
    setWidth("")
    setHeight("")
    setDepth("")
    setResult("")
  }

  // ✅ إغلاق عند النقر خارج الديف
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  return (
    <div className="p-4 relative">
      {/* زر فتح البوبوفر */}
      <div className="relative inline-block group">
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-500 text-3xl hover:text-yellow-600 border border-amber-100 p-2 rounded-full"
        >
          <CiCalculator2 />
        </button>

        {/* النص يظهر عند hover */}
        <span className="absolute left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block bg-yellow-500 text-white text-sm px-2 py-1 rounded shadow-lg whitespace-nowrap">
          احسب تكلفة الشحن
        </span>
      </div>

      {/* البوبوفر */}
      {open && (
        <div
          ref={popoverRef}
          className="absolute top-full mt-2 w-72 bg-white border rounded shadow-lg p-4 z-10"
        >
          {/* زر الإغلاق */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
          >
            ×
          </button>

          <div className="flex flex-col gap-3 mt-2">
            <label htmlFor="width" className="font-medium">Width</label>
            <input
              id="width"
              type="number"
              className="border rounded p-2"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />

            <label htmlFor="height" className="font-medium">Height</label>
            <input
              id="height"
              type="number"
              className="border rounded p-2"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />

            <label htmlFor="depth" className="font-medium">Depth</label>
            <input
              id="depth"
              type="number"
              className="border rounded p-2"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
            />

            <div className="flex gap-2 mt-2">
              <button
                onClick={handleCount}
                className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600"
              >
                Count
              </button>
              <button
                onClick={handleReset}
                className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
              >
                Reset
              </button>
            </div>

            <span className="mt-3 font-semibold text-lg text-center">
              Result: {result}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
