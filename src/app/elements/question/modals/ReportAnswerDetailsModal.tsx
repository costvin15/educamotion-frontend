import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import client from "@/client";

import { useQuestionReportStore } from "@/app/elements/question/store/report";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { ScrollArea } from "@/components/ui/ScrollArea";
import { mergeClassNames } from "@/components/utils";
import { Question, User } from "@/app/elements/question/types";

interface AnswerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageSelected: number;
};

async function fetchUserInformation(userId: string) : Promise<User> {
  const { data } = await client.get(`/classroom/user/${userId}`);
  return data;
}

async function fetchQuestionInformation(questionId: string) : Promise<Question> {
  const { data } = await client.get(`/element/question/detail/${questionId}`);
  return data;
}

function StatusBadge({ status } : { status: boolean }) {
  return (
    <Badge
      className={mergeClassNames(
        'capitalize',
        status && 'bg-green-100 text-green-800 hover:bg-green-100',
        !status && 'bg-red-100 text-red-800 hover:bg-red-100'
      )}
    >
      {status ? 'Correta' : 'Incorreta'}
    </Badge>
  );
}

export function ReportAnswerDetailsModal({ isOpen, onClose, pageSelected } : AnswerDetailsModalProps) {
  const store = useQuestionReportStore();
  const [userInformation, setUserInformation] = useState<Record<string, User>>({});
  const [questionInformation, setQuestionInformation] = useState<Record<string, Question>>({});

  const slideId = store.presentation?.slidesIds[pageSelected] || 0;
  const answers = store.report?.pages.find((page) => page.page === slideId)?.answers || [];

  useEffect(() => {
    if (!store.report || !store.presentation || !store.slidesIds) {
      return;
    }

    (async () => {
      const usersIds = answers.map((answer) => answer.userId);
      console.log('usersIds', usersIds);
      const usersInformation = await Promise.all(usersIds.map(fetchUserInformation));
      console.log('usersInformation', usersInformation);
      const usersInformationMap = usersInformation.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {} as Record<string, User>);
      setUserInformation(usersInformationMap);
    })();

    (async () => {
      const questionsIds = answers.map((answer) => answer.questionId);
      const questionsInformation = await Promise.all(questionsIds.map(fetchQuestionInformation));
      const questionsInformationMap = questionsInformation.reduce((acc, question) => {
        acc[question.id] = question;
        return acc;
      }, {} as Record<string, Question>);
      setQuestionInformation(questionsInformationMap);
    })();
  }, [store.report]);

  if (!store.report || !store.presentation || !store.slidesIds) {
    return <></>;
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className='sm:max-w-[680px]'>
        <DialogHeader>
          <DialogTitle>Respostas da página {pageSelected + 1}</DialogTitle>
        </DialogHeader>
        <ScrollArea className='h-[500px]'>
          {answers.length === 0 && (
            <div className='text-center text-muted-foreground py-4'>
              Nenhuma resposta registrada para esta página
            </div>
          )}
          {answers.map((answer, index) => (
            <Card key={index} className='m-3 p-6 mb-4'>
              <div className='flex items-start gap-6'>
                <Avatar className='h-12 w-12'>
                  <AvatarImage src={userInformation[answer.userId]?.profilePicture || ''} alt='Avatar' />
                  <AvatarFallback>{userInformation[answer.userId]?.name[0] || ''}</AvatarFallback>
                </Avatar>
                <div className='flex-1 min-w-0'>
                  <div className='flex items-center justify-between'>
                    <h2 className='text-lg font-semibold text-secondary-900'>
                      {userInformation[answer.userId]?.name || 'Usuário não encontrado'}
                    </h2>
                    <div className='flex items-center gap-4'>
                      <div className='flex items-center text-sm text-gray-500'>
                        <CalendarIcon className='h-4 w-4 mr-1' />
                        {format(new Date(answer.answeredAt), 'dd/MM/yyyy HH:mm')}
                      </div>
                      <StatusBadge status={answer.correct} />
                    </div>
                  </div>
                  <div className='mt-2'>
                    <p>Questão respondida: {questionInformation[answer.questionId]?.title || 'Questão não encontrada'}</p>
                    <p>Tipo de questão: {questionInformation[answer.questionId]?.type || 'Questão não encontrada'}</p>
                    <p className='text-secondary-700'>Resposta registrada:</p>
                    <pre className='bg-secondary p-4 rounded-lg mt-1'>
                      {answer.answer.length === 0 && <p>Nenhuma resposta registrada</p>}
                      {answer.answer}
                    </pre>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
