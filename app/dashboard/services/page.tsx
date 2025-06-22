// import Pagination from '@/app/ui/services/pagination';
// import Search from '@/app/ui/search';
// import Table from '@/app/ui/services/table';
// import { CreateServices } from '@/app/ui/services/buttons';

// import { Suspense } from 'react';
// import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
// import { fetchInvoicesPages } from '@/app/lib/data';

// export default async function Page(props: {
//   searchParams?: Promise<{
//     query?: string;
//     page?: string;
//   }>;
// }) {
//   const searchParams = await props.searchParams;
//   const query = searchParams?.query || '';
//   const currentPage = Number(searchParams?.page) || 1;
//   const totalPages = await fetchInvoicesPages(query);

//   return (
//     <div className="w-full">
//       <div className="flex w-full items-center justify-between">
//         <h1 className="text-2xl font-semibold text-white">Serviços</h1>
//       </div>
//       <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
//         <Search placeholder="Buscar serviços prestados..." />
//         <CreateServices />
//       </div>
//       {<Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
//         <Table query={query} currentPage={currentPage} />
//       </Suspense>}
//       <div className="mt-5 flex w-full justify-center">
//         {<Pagination totalPages={totalPages} />}
//       </div>
//     </div>
//   );
// }