"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Check, Plus, Trash2, Star, Quote, Target } from "lucide-react"

interface ReadingBook {
  id: string
  title: string
  author: string
  totalPages: number
  currentPage: number
  startDate: string
  coverColor: string
  category: "fiction" | "self-help" | "academic" | "biography" | "other"
  status: "to-read" | "reading" | "completed"
  rating?: number
  notes?: string
  quotes?: string[]
}

interface ReadingChallenge {
  id: string
  title: string
  target: number
  current: number
  timeframe: string
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
      category: "self-help",
      status: "reading",
      quotes: ["You do not rise to the level of your goals. You fall to the level of your systems."],
    },
  ])
  const [currentBook, setCurrentBook] = useState<ReadingBook | null>(null)
  const [newBookTitle, setNewBookTitle] = useState("")
  const [newBookAuthor, setNewBookAuthor] = useState("")
  const [newBookPages, setNewBookPages] = useState("")
  const [newBookCategory, setNewBookCategory] = useState<ReadingBook["category"]>("self-help")
  const [showAddBook, setShowAddBook] = useState(false)
  const [editingBook, setEditingBook] = useState<string | null>(null)
  const [todayPages, setTodayPages] = useState(0)
  const [readingTime, setReadingTime] = useState(0)
  const [newQuote, setNewQuote] = useState("")
  const [showQuoteInput, setShowQuoteInput] = useState(false)
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const [challenges] = useState<ReadingChallenge[]>([
    { id: "1", title: "Read 24 books this year", target: 24, current: 3, timeframe: "2025" },
    { id: "2", title: "Read 15 pages daily", target: 15, current: todayPages, timeframe: "daily" },
  ])

  useEffect(() => {
    const savedBooks = localStorage.getItem("books")
    const savedTodayPages = localStorage.getItem("todayPages")
    const savedReadingTime = localStorage.getItem("readingTime")

    if (savedBooks) {
      const parsedBooks = JSON.parse(savedBooks)
      setBooks(parsedBooks)
      if (parsedBooks.length > 0) {
        const currentReading = parsedBooks.find((book: ReadingBook) => book.status === "reading")
        setCurrentBook(currentReading || parsedBooks[0])
      }
    }
    if (savedTodayPages) setTodayPages(Number.parseInt(savedTodayPages))
    if (savedReadingTime) setReadingTime(Number.parseInt(savedReadingTime))
  }, [])

  const saveBooks = (updatedBooks: ReadingBook[]) => {
    setBooks(updatedBooks)
    localStorage.setItem("books", JSON.stringify(updatedBooks))
  }

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
      category: newBookCategory,
      status: "to-read",
      quotes: [],
    }

    const updatedBooks = [...books, newBook]
    saveBooks(updatedBooks)

    setNewBookTitle("")
    setNewBookAuthor("")
    setNewBookPages("")
    setShowAddBook(false)

    if (updatedBooks.length === 1) {
      setCurrentBook(newBook)
    }
  }

  const deleteBook = (bookId: string) => {
    if (confirm("Are you sure you want to delete this book?")) {
      const updatedBooks = books.filter((book) => book.id !== bookId)
      saveBooks(updatedBooks)

      if (currentBook?.id === bookId) {
        setCurrentBook(updatedBooks.length > 0 ? updatedBooks[0] : null)
      }
    }
  }

  const updateBookStatus = (bookId: string, status: ReadingBook["status"]) => {
    const updatedBooks = books.map((book) => (book.id === bookId ? { ...book, status } : book))
    saveBooks(updatedBooks)

    if (currentBook?.id === bookId) {
      setCurrentBook({ ...currentBook, status })
    }
  }

  const rateBook = (bookId: string, rating: number) => {
    const updatedBooks = books.map((book) => (book.id === bookId ? { ...book, rating } : book))
    saveBooks(updatedBooks)

    if (currentBook?.id === bookId) {
      setCurrentBook({ ...currentBook, rating })
    }
  }

  const addQuote = () => {
    if (!newQuote.trim() || !currentBook) return

    const updatedBooks = books.map((book) =>
      book.id === currentBook.id ? { ...book, quotes: [...(book.quotes || []), newQuote] } : book,
    )
    saveBooks(updatedBooks)

    setCurrentBook({ ...currentBook, quotes: [...(currentBook.quotes || []), newQuote] })
    setNewQuote("")
    setShowQuoteInput(false)
  }

  const updateProgress = (amount: number) => {
    if (!currentBook) return

    const updatedCurrentPage = Math.min(currentBook.totalPages, Math.max(0, currentBook.currentPage + amount))
    const isCompleted = updatedCurrentPage === currentBook.totalPages

    const updatedBook = {
      ...currentBook,
      currentPage: updatedCurrentPage,
      status: isCompleted ? ("completed" as const) : currentBook.status,
    }

    const updatedBooks = books.map((book) => (book.id === currentBook.id ? updatedBook : book))
    saveBooks(updatedBooks)
    setCurrentBook(updatedBook)

    if (amount > 0) {
      const newTodayPages = todayPages + amount
      setTodayPages(newTodayPages)
      localStorage.setItem("todayPages", newTodayPages.toString())
    }
  }

  const startReadingTimer = () => {
    const startTime = Date.now()
    const interval = setInterval(() => {
      setReadingTime(Math.floor((Date.now() - startTime) / 1000 / 60))
    }, 60000)

    return () => clearInterval(interval)
  }

  const filteredBooks = books.filter((book) => {
    const categoryMatch = filterCategory === "all" || book.category === filterCategory
    const statusMatch = filterStatus === "all" || book.status === filterStatus
    return categoryMatch && statusMatch
  })

  const getCategoryColor = (category: ReadingBook["category"]) => {
    switch (category) {
      case "fiction":
        return "bg-purple-100 text-purple-700"
      case "self-help":
        return "bg-blue-100 text-blue-700"
      case "academic":
        return "bg-green-100 text-green-700"
      case "biography":
        return "bg-yellow-100 text-yellow-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusColor = (status: ReadingBook["status"]) => {
    switch (status) {
      case "to-read":
        return "bg-gray-100 text-gray-700"
      case "reading":
        return "bg-blue-100 text-blue-700"
      case "completed":
        return "bg-green-100 text-green-700"
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">📚 Reading Tracker</h1>
        <p className="text-purple-600">Track your reading journey and build a daily reading habit</p>
      </div>

      {/* Reading Challenges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {challenges.map((challenge) => (
          <Card key={challenge.id} className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-yellow-800">{challenge.title}</h3>
                <Target className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="flex justify-between text-sm text-yellow-700 mb-2">
                <span>Progress</span>
                <span>
                  {challenge.current}/{challenge.target}
                </span>
              </div>
              <Progress value={(challenge.current / challenge.target) * 100} className="h-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Book */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-purple-800">
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Current Book
                </div>
                {currentBook && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowQuoteInput(!showQuoteInput)}
                      className="border-purple-300 text-purple-600"
                    >
                      <Quote className="w-4 h-4 mr-1" />
                      Add Quote
                    </Button>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentBook ? (
                <div>
                  <div className="flex items-start mb-6">
                    <div
                      className={`w-24 h-32 ${currentBook.coverColor} rounded-md flex items-center justify-center text-white font-bold text-xl mr-6`}
                    >
                      {currentBook.title.substring(0, 1)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-purple-800">{currentBook.title}</h3>
                      <p className="text-purple-600">by {currentBook.author}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge className={getCategoryColor(currentBook.category)}>{currentBook.category}</Badge>
                        <Badge className={getStatusColor(currentBook.status)}>{currentBook.status}</Badge>
                      </div>

                      <div className="mt-3">
                        <span className="text-sm font-medium text-purple-700">
                          {currentBook.currentPage} of {currentBook.totalPages} pages
                        </span>
                        <Progress
                          value={(currentBook.currentPage / currentBook.totalPages) * 100}
                          className="mt-2 h-2"
                        />
                      </div>

                      {/* Rating */}
                      <div className="flex items-center mt-3">
                        <span className="text-sm text-purple-600 mr-2">Rate this book:</span>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 cursor-pointer ${
                              star <= (currentBook.rating || 0) ? "text-yellow-500 fill-current" : "text-gray-300"
                            }`}
                            onClick={() => rateBook(currentBook.id, star)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quote Input */}
                  {showQuoteInput && (
                    <div className="mb-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <Textarea
                        placeholder="Add a memorable quote from this book..."
                        value={newQuote}
                        onChange={(e) => setNewQuote(e.target.value)}
                        className="mb-2"
                      />
                      <div className="flex gap-2">
                        <Button onClick={addQuote} size="sm" className="bg-purple-500 hover:bg-purple-600">
                          Save Quote
                        </Button>
                        <Button onClick={() => setShowQuoteInput(false)} size="sm" variant="outline">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Quotes Display */}
                  {currentBook.quotes && currentBook.quotes.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium text-purple-700 mb-2">Saved Quotes:</h4>
                      <div className="space-y-2">
                        {currentBook.quotes.map((quote, index) => (
                          <div
                            key={index}
                            className="p-3 bg-yellow-50 rounded border border-yellow-200 italic text-yellow-800"
                          >
                            "{quote}"
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reading Progress */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-purple-700 mb-2">Today's Reading</h4>
                      <div className="flex items-center gap-4 mb-4">
                        <div>
                          <div className="text-2xl font-bold text-purple-800">{todayPages}</div>
                          <span className="text-purple-600 text-sm">pages read</span>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-purple-800">{readingTime}</div>
                          <span className="text-purple-600 text-sm">minutes</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 flex-wrap">
                      <Button onClick={() => updateProgress(5)} className="bg-purple-500 hover:bg-purple-600">
                        Read 5 pages
                      </Button>
                      <Button onClick={() => updateProgress(10)} className="bg-purple-500 hover:bg-purple-600">
                        Read 10 pages
                      </Button>
                      <Button onClick={() => updateProgress(15)} className="bg-purple-500 hover:bg-purple-600">
                        Read 15 pages
                      </Button>
                      <Button
                        onClick={startReadingTimer}
                        variant="outline"
                        className="border-purple-300 text-purple-600"
                      >
                        Start Timer
                      </Button>
                    </div>

                    {/* Status Update */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateBookStatus(currentBook.id, "to-read")}
                        className={currentBook.status === "to-read" ? "bg-gray-100" : ""}
                      >
                        To Read
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateBookStatus(currentBook.id, "reading")}
                        className={currentBook.status === "reading" ? "bg-blue-100" : ""}
                      >
                        Reading
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateBookStatus(currentBook.id, "completed")}
                        className={currentBook.status === "completed" ? "bg-green-100" : ""}
                      >
                        Completed
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
              {/* Filters */}
              <div className="mb-4 space-y-2">
                <div className="flex gap-2 flex-wrap">
                  <Button
                    size="sm"
                    variant={filterStatus === "all" ? "default" : "outline"}
                    onClick={() => setFilterStatus("all")}
                    className={filterStatus === "all" ? "bg-purple-500" : ""}
                  >
                    All
                  </Button>
                  <Button
                    size="sm"
                    variant={filterStatus === "reading" ? "default" : "outline"}
                    onClick={() => setFilterStatus("reading")}
                    className={filterStatus === "reading" ? "bg-blue-500" : ""}
                  >
                    Reading
                  </Button>
                  <Button
                    size="sm"
                    variant={filterStatus === "completed" ? "default" : "outline"}
                    onClick={() => setFilterStatus("completed")}
                    className={filterStatus === "completed" ? "bg-green-500" : ""}
                  >
                    Completed
                  </Button>
                </div>
              </div>

              {/* Add Book Form */}
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
                    <select
                      value={newBookCategory}
                      onChange={(e) => setNewBookCategory(e.target.value as ReadingBook["category"])}
                      className="w-full p-2 border border-purple-200 rounded"
                    >
                      <option value="fiction">Fiction</option>
                      <option value="self-help">Self-Help</option>
                      <option value="academic">Academic</option>
                      <option value="biography">Biography</option>
                      <option value="other">Other</option>
                    </select>
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

              {/* Books List */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredBooks.map((book) => (
                  <div
                    key={book.id}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      currentBook?.id === book.id
                        ? "bg-purple-50 border-purple-300"
                        : "bg-white border-gray-200 hover:border-purple-200"
                    }`}
                  >
                    <div
                      className={`w-10 h-14 ${book.coverColor} rounded flex items-center justify-center text-white font-bold mr-3`}
                    >
                      {book.title.substring(0, 1)}
                    </div>
                    <div className="flex-1" onClick={() => setCurrentBook(book)}>
                      <div className="font-medium text-purple-800">{book.title}</div>
                      <div className="text-xs text-gray-500">{book.author}</div>
                      <div className="flex gap-1 mt-1">
                        <Badge className={getCategoryColor(book.category)} size="sm">
                          {book.category}
                        </Badge>
                        <Badge className={getStatusColor(book.status)} size="sm">
                          {book.status}
                        </Badge>
                      </div>
                      <div className="mt-1 text-xs text-purple-600">
                        {Math.round((book.currentPage / book.totalPages) * 100)}% complete
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      {currentBook?.id === book.id && <Check className="w-4 h-4 text-purple-500" />}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteBook(book.id)
                        }}
                        className="text-red-500 hover:text-red-700 p-1 h-auto"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}

                {filteredBooks.length === 0 && !showAddBook && (
                  <div className="text-center py-4">
                    <p className="text-purple-600 text-sm">No books match your current filters.</p>
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
