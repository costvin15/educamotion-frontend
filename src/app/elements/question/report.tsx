import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

import client from '@/client';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Presentation, Report } from '@/app/elements/question/types';
import { useQuestionReportStore } from '@/app/elements/question/store/report';
import { ReportAnswerDetailsModal } from '@/app/elements/question/modals/ReportAnswerDetailsModal';

async function fetchPresentation(presentationId: string) : Promise<Presentation> {
  const { data } = await client.get(`/presentation/detail/${presentationId}`);
  return data;
}

async function fetchReport(presentationId: string) : Promise<Report> {
  const { data } = await client.get(`/element/question/report/${presentationId}`);
  return data;
}

interface ReportLayoutProps {
  presentationId: string;
}

export default function ReportLayout({ presentationId } : ReportLayoutProps) {
  const store = useQuestionReportStore();
  const [loading, setLoading] = useState(true);
  const [pageSelected, setPageSelected] = useState(0);
  const [openAnswerDetail, setOpenAnswerDetail] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const [presentation, report] = await Promise.all([
      fetchPresentation(presentationId),
      fetchReport(presentationId),
    ]);
    store.setPresentation(presentation);
    store.setReport(report);
    store.setSlidesIds(presentation.slidesIds);
    setLoading(false);
  }

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      // TODO: Handle error
      console.error(error);
    }
  }, []);

  if (loading || !store.report || !store.presentation) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Página</CardTitle>
        </CardHeader>
        <CardContent>
          <Loader2 className='animate-spin h-8 w-8' />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {store.report.pages.map((page, index) => {
        const pageIndex = store.slidesIds.get(page.page);
        if (pageIndex === undefined) {
          return null;
        }

        return (
          <Card key={pageIndex}>
            <CardHeader>
              <CardTitle>Página nº {pageIndex + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Respostas registradas: {page.answers.length}</p>
            </CardContent>
            <CardFooter>
              <Button
                variant='outline'
                onClick={() => {
                  setPageSelected(index);
                  setOpenAnswerDetail(true);
                }}
              >
                Ver detalhes
              </Button>
            </CardFooter>
          </Card>
        );
      })}

      <ReportAnswerDetailsModal
        isOpen={openAnswerDetail}
        onClose={() => setOpenAnswerDetail(false)}
        pageSelected={pageSelected}
      />
    </>
  );
}
