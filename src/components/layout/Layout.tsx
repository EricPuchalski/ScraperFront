import React, { useEffect } from 'react';
import { Header } from './Header';
import { Sidebar } from './SideBar';
import Footer from './Footer';
import { SearchResults } from '../search/SearchResults';

interface LayoutProps {
  children: React.ReactNode;
  headerProps: any;
  sidebarProps: any;
  searchResultsProps: any;
  currentPage: number; // Add currentPage prop
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  headerProps,
  sidebarProps,
  searchResultsProps,
  currentPage
}) => {
  useEffect(() => {
    // Scroll to the top of the page whenever currentPage changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Header {...headerProps} />
      <SearchResults {...searchResultsProps} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-auto">
            <Sidebar {...sidebarProps} />
          </div>
          <div className="w-full">
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
