export interface WordCloud {
  id: string;
  title: string;
  enableMultipleEntries: boolean;
}

interface WordCloudDistributionItem {
  word: string;
  frequency: number;
}

export interface WordCloudDistribution {
  frequencyDistribution: WordCloudDistributionItem[];
}
