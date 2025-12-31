import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight, Lightbulb, Plus, Search, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/layout/Header';
import { useIdea, type AnalysisResult } from '@/hooks/useIdea';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function History() {
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { getHistory, deleteIdea } = useIdea();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setHistory(getHistory());
  }, [getHistory]);

  const filteredHistory = history.filter((item) =>
    item.ideaName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async () => {
    if (deleteId) {
      const updated = await deleteIdea(deleteId);
      if (updated) {
        setHistory(updated);
        toast({ title: 'Deleted', description: 'Analysis removed from history.' });
      }
      setDeleteId(null);
    }
  };

  const handleViewResult = (result: AnalysisResult) => {
    navigate('/results', { state: { result } });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container py-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analysis History</h1>
            <p className="text-muted-foreground">Manage your previous startup idea evaluations.</p>
          </div>
          <Button asChild><Link to="/analyze"><Plus className="mr-2 h-4 w-4" /> New Analysis</Link></Button>
        </div>

        <div className="mb-6 relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search ideas..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
        </div>

        {filteredHistory.length === 0 ? (
          <div className="text-center py-20 border border-dashed rounded-2xl">
            <Lightbulb className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold">No analyses found</h2>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredHistory.map((item) => (
              <div key={item.id} className="group relative border rounded-xl p-6 bg-card hover:shadow-md transition-all">
                <button onClick={() => setDeleteId(item.id)} className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity">
                  <Trash2 className="h-4 w-4" />
                </button>
                <div onClick={() => handleViewResult(item)} className="cursor-pointer">
                  <div className="text-2xl font-bold text-primary mb-2">{item.sanity_score.toFixed(0)}%</div>
                  <h3 className="font-semibold mb-2">{item.ideaName}</h3>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {new Date(item.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete permanently?</AlertDialogTitle>
            <AlertDialogDescription>This will remove the analysis from your local history and the cloud.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-white hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}