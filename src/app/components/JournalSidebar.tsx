'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FiBook, FiPlus, FiSearch, FiX, FiTrash2, FiEdit, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface Journal {
  id: string;
  title: string;
  content: string;
  date: Date;
}

export default function JournalSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [journals, setJournals] = useState<Journal[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newJournal, setNewJournal] = useState({ title: '', content: '' });
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Load journals from localStorage on mount
  useEffect(() => {
    const savedJournals = localStorage.getItem('journals');
    if (savedJournals) {
      setJournals(JSON.parse(savedJournals));
    }
  }, []);

  // Save journals to localStorage when updated
  useEffect(() => {
    localStorage.setItem('journals', JSON.stringify(journals));
  }, [journals]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJournal.title || !newJournal.content) return;

    if (isEditing) {
      setJournals(journals.map(journal => 
        journal.id === isEditing 
          ? { ...journal, title: newJournal.title, content: newJournal.content }
          : journal
      ));
      setIsEditing(null);
    } else {
      setJournals([
        {
          id: Date.now().toString(),
          title: newJournal.title,
          content: newJournal.content,
          date: new Date(),
        },
        ...journals,
      ]);
    }
    setNewJournal({ title: '', content: '' });
    setIsWriting(false);
  };

  const deleteJournal = (id: string) => {
    setJournals(journals.filter(journal => journal.id !== id));
  };

  const editJournal = (journal: Journal) => {
    setNewJournal({ title: journal.title, content: journal.content });
    setIsEditing(journal.id);
    setIsWriting(true);
  };

  const filteredJournals = journals.filter(journal =>
    journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    journal.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
      
      <div className="relative h-full" ref={sidebarRef}>
        {/* Sidebar Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-[#2A2A2A] rounded-full p-2 shadow-lg hover:bg-[#2A2A2A]/80 transition-all duration-300 z-10"
          aria-label={isOpen ? 'Collapse journal sidebar' : 'Expand journal sidebar'}
        >
          {isOpen ? (
            <FiChevronLeft className="w-4 h-4 text-[#BB86FC]" />
          ) : (
            <FiChevronRight className="w-4 h-4 text-[#BB86FC]" />
          )}
        </button>

        {/* Main Sidebar */}
        <div
          className={`h-full border-r border-[#2A2A2A]/50 bg-[#1E1E1E]/80 backdrop-blur-sm transition-all duration-300 ${
            isOpen ? 'w-80' : 'w-16'
          }`}
        >
          <div className="p-4 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <FiBook className="w-6 h-6 text-[#BB86FC]" />
                  {isOpen && journals.length === 0 && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BB86FC] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#BB86FC]"></span>
                    </span>
                  )}
                </div>
                {isOpen && <h2 className="text-lg font-semibold text-white">Personal Journal</h2>}
              </div>
              {isOpen && (
                <button
                  onClick={() => {
                    setIsWriting(true);
                    setIsEditing(null);
                    setNewJournal({ title: '', content: '' });
                  }}
                  className="p-2 rounded-lg bg-[#2A2A2A] text-[#BB86FC] hover:bg-[#2A2A2A]/80 transition-all duration-300 group relative"
                  aria-label="Create new journal entry"
                >
                  <FiPlus className="w-5 h-5" />
                  {journals.length === 0 && (
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-[#BB86FC] text-[#121212] px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Write your first entry!
                    </span>
                  )}
                </button>
              )}
            </div>

            {/* Content */}
            {isOpen && (
              <div className="flex-1 flex flex-col">
                {/* Empty State */}
                {!isWriting && journals.length === 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center px-4 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#2A2A2A] flex items-center justify-center">
                      <FiBook className="w-8 h-8 text-[#BB86FC]" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white">Welcome to Your Journal</h3>
                      <p className="text-sm text-[#9E9E9E] leading-relaxed">
                        This is your private space to write down thoughts, ideas, and reflections. 
                        Start by creating your first journal entry.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsWriting(true);
                        setIsEditing(null);
                        setNewJournal({ title: '', content: '' });
                      }}
                      className="mt-4 px-4 py-2 bg-[#BB86FC] text-[#121212] rounded-lg font-medium hover:bg-[#BB86FC]/90 transition-colors duration-300 flex items-center gap-2"
                    >
                      <FiPlus className="w-4 h-4" />
                      Create First Entry
                    </button>
                  </div>
                )}

                {/* Search Bar */}
                {!isWriting && journals.length > 0 && (
                  <div className="relative mb-4">
                    <input
                      type="text"
                      placeholder="Search your journals..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-[#2A2A2A] rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-[#616161] focus:outline-none focus:ring-2 focus:ring-[#BB86FC] transition-all duration-300"
                    />
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#616161] w-4 h-4" />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#616161] hover:text-[#BB86FC] transition-colors duration-300"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}

                {/* Journal Form */}
                {isWriting ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="journalTitle" className="text-sm font-medium text-[#BB86FC]">
                        Title
                      </label>
                      <input
                        id="journalTitle"
                        type="text"
                        placeholder="Give your entry a title..."
                        value={newJournal.title}
                        onChange={(e) => setNewJournal({ ...newJournal, title: e.target.value })}
                        className="w-full bg-[#2A2A2A] rounded-lg px-4 py-2 text-white placeholder:text-[#616161] focus:outline-none focus:ring-2 focus:ring-[#BB86FC] transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="journalContent" className="text-sm font-medium text-[#BB86FC]">
                        Your Thoughts
                      </label>
                      <textarea
                        id="journalContent"
                        placeholder="Write your thoughts here..."
                        value={newJournal.content}
                        onChange={(e) => setNewJournal({ ...newJournal, content: e.target.value })}
                        className="w-full h-40 bg-[#2A2A2A] rounded-lg px-4 py-2 text-white placeholder:text-[#616161] focus:outline-none focus:ring-2 focus:ring-[#BB86FC] resize-none transition-all duration-300"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 bg-[#BB86FC] text-[#121212] rounded-lg py-2 font-medium hover:bg-[#BB86FC]/90 transition-colors duration-300"
                      >
                        {isEditing ? 'Update Entry' : 'Save Entry'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsWriting(false);
                          setIsEditing(null);
                          setNewJournal({ title: '', content: '' });
                        }}
                        className="flex-1 bg-[#2A2A2A] text-white rounded-lg py-2 font-medium hover:bg-[#2A2A2A]/80 transition-colors duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Journal List */
                  journals.length > 0 && (
                    <div className="overflow-y-auto flex-1 space-y-4 pr-2">
                      {filteredJournals.map((journal) => (
                        <div
                          key={journal.id}
                          className="group bg-[#2A2A2A] rounded-lg p-4 hover:bg-[#2A2A2A]/80 transition-all duration-300"
                        >
                          <h3 className="text-white font-medium mb-2 group-hover:text-[#BB86FC] transition-colors duration-300">
                            {journal.title}
                          </h3>
                          <p className="text-[#9E9E9E] text-sm line-clamp-2">{journal.content}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-[#616161]">
                              {new Date(journal.date).toLocaleDateString()}
                            </span>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                              <button
                                onClick={() => editJournal(journal)}
                                className="text-[#BB86FC] hover:text-[#BB86FC]/80 transition-colors duration-300"
                                aria-label="Edit journal"
                              >
                                <FiEdit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteJournal(journal.id)}
                                className="text-[#BB86FC] hover:text-[#BB86FC]/80 transition-colors duration-300"
                                aria-label="Delete journal"
                              >
                                <FiTrash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 