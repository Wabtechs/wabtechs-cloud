import { Skeleton } from '@wabtechs/ui/skeleton';
import { Card, CardContent, CardHeader } from '@wabtechs/ui/card';

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card">
        <div className="flex h-16 items-center border-b px-4">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="ml-2 h-5 w-32" />
        </div>
        <div className="space-y-1 p-3">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-9 w-full rounded-lg" />
          ))}
        </div>
      </div>
      <div className="fixed top-0 right-0 z-30 h-16 w-full border-b bg-background/95 backdrop-blur lg:pl-64">
        <div className="flex h-full items-center justify-between px-4">
          <Skeleton className="h-8 w-8 rounded-lg lg:hidden" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-9 rounded-lg" />
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </div>
      </div>
      <main className="pt-16 lg:pl-64">
        <div className="p-4 lg:p-6 space-y-6">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="mt-2 h-4 w-64" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="mt-2 h-8 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-5 w-1/4" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
