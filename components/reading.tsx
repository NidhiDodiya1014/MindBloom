"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Check, Plus } from "lucide-react"

interface ReadingBook {
  id: string
  title: string
  author: string
  totalPages: number
  currentPage: number
  startDate: string
  coverColor: string
}

export function Reading() {
  const [books, setBooks] = useState<ReadingBook[]>([
    {
      id: "1",
      title: "Atomic Habits",
      author: "James Clear",
      totalPages: 320,
      currentPage: 45,
      startDate: "2025-05-28",
      coverColor: "bg-blue-500",
    },
  ])
  const [currentBook, setCurrentBook] = useState<ReadingBook | null>(null)
  const [newBookTitle, setNewBookTitle] = useState("")
  const [newBookAuthor, setNewBookAuthor] = useState("")
  const [newBookPages, setNewBookPages] = useState("")
  const [showAddBook, setShowAddBook] = useState(false)
  const [todayPages, setTodayPages] = useState(0)

  useEffect(() => {
    // Load saved books
    const savedBooks = localStorage.getItem("books")
    if (savedBooks) {
      const parsedBooks = JSON.parse(savedBooks)
      setBooks(parsedBooks)

      // Set current book to the first one
      if (parsedBooks.length > 0) {
        setCurrentBook(parsedBooks[0])
      }
    }

    // Load today's reading progress
    const savedTodayPages = localStorage.getItem("todayPages")
    if (savedTodayPages) {
      setTodayPages(Number.parseInt(savedTodayPages))
    }
  }, [])

  const addBook = () => {
    if (!newBookTitle || !newBookAuthor || !newBookPages) return

    const colors = ["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-yellow-500", "bg-red-500", "bg-pink-500"]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    const newBook: ReadingBook = {
      id: Date.now().toString(),
      title: newBookTitle,
      author: newBookAuthor,
      totalPages: Number.parseInt(newBookPages),
      currentPage: 0,
      startDate: new Date().toISOString().split("T")[0],
      coverColor: randomColor,
    }

    const updatedBooks = [...books, newBook]
    setBooks(updatedBooks)
    localStorage.setItem("books", JSON.stringify(updatedBooks))

    // Reset form
    setNewBookTitle("")
    setNewBookAuthor("")
    setNewBookPages("")
    setShowAddBook(false)

    // Set as current book if it's the first one
    if (updatedBooks.length === 1) {
      setCurrentBook(newBook)
    }
  }

  const selectBook = (book: ReadingBook) => {
    setCurrentBook(book)
  }

  const updateProgress = (amount: number) => {
    if (!currentBook) return

    const updatedCurrentPage = Math.min(currentBook.totalPages, Math.max(0, currentBook.currentPage + amount))

    const updatedBook = {
      ...currentBook,
      currentPage: updatedCurrentPage,
    }

    const updatedBooks = books.map((book) => (book.id === currentBook.id ? updatedBook : book))

    setCurrentBook(updatedBook)
    setBooks(updatedBooks)
    localStorage.setItem("books", JSON.stringify(updatedBooks))

    // Update today's reading count
    if (amount > 0) {
      const newTodayPages = todayPages + amount
      setTodayPages(newTodayPages)
      localStorage.setItem("todayPages", newTodayPages.toString())
    }
  }

  const calculateDaysReading = (startDate: string) => {
    const start = new Date(startDate)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">📚 Reading Tracker</h1>
        <p className="text-purple-600">Track your reading journey and build a daily reading habit</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Book */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-purple-800">
                <BookOpen className="w-5 h-5 mr-2" />
                Current Book
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentBook ? (
                <div>
                  <div className="flex items-center mb-6">
                    <div
                      className={`w-24 h-32 ${currentBook.coverColor} rounded-md flex items-center justify-center text-white font-bold text-xl`}
                    >
                      {currentBook.title.substring(0, 1)}
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-bold text-purple-800">{currentBook.title}</h3>
                      <p className="text-purple-600">by {currentBook.author}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Reading for {calculateDaysReading(currentBook.startDate)} days
                      </p>
                      <div className="mt-2">
                        <span className="text-sm font-medium text-purple-700">
                          {currentBook.currentPage} of {currentBook.totalPages} pages
                        </span>
                        <Progress
                          value={(currentBook.currentPage / currentBook.totalPages) * 100}
                          className="mt-2 h-2"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-purple-700 mb-2">Today's Reading</h4>
                      <div className="flex items-center">
                        <div className="text-2xl font-bold text-purple-800 mr-3">{todayPages}</div>
                        <span className="text-purple-600">pages read today</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Daily goal: 10-15 pages</p>
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={() => updateProgress(5)} className="bg-purple-500 hover:bg-purple-600">
                        Read 5 pages
                      </Button>
                      <Button onClick={() => updateProgress(10)} className="bg-purple-500 hover:bg-purple-600">
                        Read 10 pages
                      </Button>
                      <Button onClick={() => updateProgress(15)} className="bg-purple-500 hover:bg-purple-600">
                        Read 15 pages
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">📚</div>
                  <p className="text-purple-600 mb-4">You haven't added any books yet.</p>
                  <Button onClick={() => setShowAddBook(true)} className="bg-purple-500 hover:bg-purple-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Book
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Book Library */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-purple-800">
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Your Library
                </div>
                <Button
                  size="sm"
                  onClick={() => setShowAddBook(!showAddBook)}
                  className="bg-purple-500 hover:bg-purple-600"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showAddBook && (
                <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-800 mb-3">Add New Book</h4>
                  <div className="space-y-3">
                    <Input
                      placeholder="Book Title"
                      value={newBookTitle}
                      onChange={(e) => setNewBookTitle(e.target.value)}
                    />
                    <Input
                      placeholder="Author"
                      value={newBookAuthor}
                      onChange={(e) => setNewBookAuthor(e.target.value)}
                    />
                    <Input
                      placeholder="Total Pages"
                      type="number"
                      value={newBookPages}
                      onChange={(e) => setNewBookPages(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Button onClick={addBook} className="w-full bg-purple-500 hover:bg-purple-600">
                        Add Book
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowAddBook(false)}
                        className="border-purple-300 text-purple-600"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {books.map((book) => (
                  <div
                    key={book.id}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      currentBook?.id === book.id
                        ? "bg-purple-50 border-purple-300"
                        : "bg-white border-gray-200 hover:border-purple-200"
                    }`}
                    onClick={() => selectBook(book)}
                  >
                    <div
                      className={`w-10 h-14 ${book.coverColor} rounded flex items-center justify-center text-white font-bold`}
                    >
                      {book.title.substring(0, 1)}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="font-medium text-purple-800">{book.title}</div>
                      <div className="text-xs text-gray-500">{book.author}</div>
                      <div className="mt-1 text-xs text-purple-600">
                        {Math.round((book.currentPage / book.totalPages) * 100)}% complete
                      </div>
                    </div>
                    {currentBook?.id === book.id && <Check className="w-4 h-4 text-purple-500" />}
                  </div>
                ))}

                {books.length === 0 && !showAddBook && (
                  <div className="text-center py-4">
                    <p className="text-purple-600 text-sm">Your book collection will appear here.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
