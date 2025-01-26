export interface WordCloud {
  id: string;
  title: string;
  multipleAnswers: boolean;
}

interface WordCloudDistributionItem {
  word: string;
  frequency: number;
}

export interface WordCloudDistribution {
  frequencyDistribution: WordCloudDistributionItem[];
}
