'use client';
import { useState } from 'react';
import { Clock, MousePointer2 } from 'lucide-react';

import { Card } from "@/components/ui/Card";
import { ScrollArea } from "@/components/ui/ScrollArea";

import { InteractionLog, InteractionType } from "@/app/control-panel/[id]/types/Interaction";

const mockLogs : InteractionLog[] = [
  {
    id: '1',
    viewerId: '1',
    viewerName: 'John Doe',
    type: InteractionType.CHAT_MESSAGE,
    element: 'Envio de Mensagem no Chat',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    data: {
      message: 'Olá, tudo bem?'
    },
  },
  {
    id: '2',
    viewerId: '2',
    viewerName: 'Jane Doe',
    type: InteractionType.FORM_SUBMIT,
    element: 'Formulário de Feedback',
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    data: {
      rating: 5,
      comment: 'Boa apresentação',
    },
  },
  {
    id: '3',
    viewerId: '3',
    viewerName: 'Alice Doe',
    type: InteractionType.INTERACTIVE_OBJECT,
    element: 'Questão Integrada do Cosmo',
    timestamp: new Date(Date.now() - 1000 * 60 * 1),
    data: {
      questionId: 'two-sum',
      question: '1. Two Sum',
      language: 'C++',
      submission: '#include <iostream>\r\n#include <vector>\r\n#include <unordered_map>\r\n\r\nusing std::vector;\r\nusing std::unordered_map;\r\n\r\nclass Solution {\r\n    unordered_map<int, int> hashmap;\r\n    vector<int> result;\r\n\r\npublic:\r\n    vector<int> twoSum(vector<int>& nums, int target) {\r\n        for (int i = 0; i < nums.size(); i++) {\r\n            int complement = target - nums[i];\r\n            if (hashmap.find(complement) != hashmap.end()) {\r\n                result.push_back(hashmap[complement]);\r\n                result.push_back(i);\r\n                return result;\r\n            }\r\n            hashmap[nums[i]] = i;\r\n        }\r\n\r\n        for (auto kv : hashmap) {\r\n            result.push_back(kv.first);\r\n        }\r\n        return result;\r\n    }\r\n};\r\n',
    },
  },
  {
    id: '4',
    viewerId: '4',
    viewerName: 'Bob Doe',
    type: InteractionType.INTERACTIVE_OBJECT,
    element: 'Questão Integrada do Cosmo',
    timestamp: new Date(Date.now() - 1000 * 60 * 1),
    data: {
      questionId: '3sum',
      question: '15. 3Sum',
      language: 'Java',
      submission: 'class Solution {\r\n    public List<List<Integer>> threeSum(int[] nums) {\r\n        Arrays.sort(nums);\r\n        List<List<Integer>> result = new ArrayList<>();\r\n\r\n        for (int i = 0; i < nums.length; i++) {\r\n            if (i > 0 && nums[i] == nums[i - 1]) {\r\n                continue;\r\n            }\r\n            int current = nums[i];\r\n            int target = -current;\r\n            int start = i + 1;\r\n            int end = nums.length - 1;\r\n\r\n            while (start < end) {\r\n                int currentSum = nums[start] + nums[end];\r\n                if (currentSum == target) {\r\n                    result.add(List.of(current, nums[start], nums[end]));\r\n                    while (start < end && nums[start] == nums[start + 1]) {\r\n                        start++;\r\n                    }\r\n                    while (start < end && nums[end] == nums[end - 1]) {\r\n                        end--;\r\n                    }\r\n                    start++;\r\n                    end--;\r\n                } else if (currentSum < target) {\r\n                    start++;\r\n                } else {\r\n                    end--;\r\n                }\r\n            }\r\n        }\r\n\r\n        return result;\r\n    }\r\n}',
    },
  },
];

export function InteractionLogs() {
  const [logs, setLogs] = useState(mockLogs);

  return (
    <Card className='p-4'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-lg font-semibold'>Registro de Eventos</h3>
        <span className='text-sm text-muted-foreground'>
          Últimas 24 horas
        </span>
      </div>
      <ScrollArea className='h-[430px]'>
        <div className='space-y-4'>
          {logs.map((log) => (
            <div
              key={log.id}
              className='p-3 bg-muted rounded-lg space-y-2'
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <MousePointer2 className='h-4 w-4 text-primary' />
                  <span className='font-medium'>{log.viewerName}</span>
                </div>
                <span className='text-sm text-muted-foreground flex items-center gap-1'>
                  <Clock className='h-3 w-3' />
                  {Math.round((Date.now() - log.timestamp.getTime()) / 1000 / 60)} minutos atrás
                </span>
              </div>
              <p className='text-sm'>
                {log.type === InteractionType.CHAT_MESSAGE && `Enviou mensagem no chat`}
                {log.type === InteractionType.BUTTON_CLICK && `Clicou em ${log.element}`}
                {log.type === InteractionType.FORM_SUBMIT && `Submeteu ${log.element}`}
                {log.type === InteractionType.PAGE_VIEW && `Visualizou ${log.element}`}
              </p>
              {log.data && (
                <div className='text-sm bg-background/50 p-2 rounded'>
                  <pre className='text-xs w-full whitespace-pre-wrap'>
                    {JSON.stringify(log.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
