import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import { Badge, Button, Select, Text, TextField } from '@pranadwaghmare2/fieldops-ui';

const statusOptions = [
  { label: 'Open', value: 'open' },
  { label: 'In progress', value: 'in_progress' },
  { label: 'Blocked', value: 'blocked' },
  { label: 'Done', value: 'done' },
] as const;

type Status = (typeof statusOptions)[number]['value'];

export default function App() {
  const [assignee, setAssignee] = useState('');
  const [status, setStatus] = useState<Status>('open');
  const [saveCount, setSaveCount] = useState(0);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-bg">
        <ScrollView
          className="flex-1"
          contentContainerClassName="gap-6 px-4 py-8"
          keyboardShouldPersistTaps="handled"
        >
          <View className="gap-2">
            <Text role="title">FieldOps UI</Text>
            <Text className="text-fg-muted">
              Bare React Native consumer using NativeWind and the published
              preset.
            </Text>
          </View>

          <View className="gap-3 rounded-md border border-border bg-surface p-4">
            <Text role="heading">Work order</Text>
            <TextField
              label="Assignee"
              placeholder="Enter a name"
              helperText="The technician assigned to this work order."
              value={assignee}
              onChangeText={setAssignee}
              endAdornment={<Text role="caption">Required</Text>}
            />
            <Select
              accessibilityLabel="Work order status"
              options={statusOptions}
              value={status}
              onValueChange={setStatus}
            />
            <View className="flex-row flex-wrap gap-2">
              <Badge status={status}>
                {statusOptions.find((option) => option.value === status)?.label}
              </Badge>
              <Badge status="blocked">Blocked</Badge>
              <Badge status="done">Done</Badge>
            </View>
          </View>

          <Button
            variant="primary"
            onPress={() => setSaveCount((count) => count + 1)}
          >
            Save work order
          </Button>
          <Text role="caption" className="text-center text-fg-muted">
            Saved {saveCount} {saveCount === 1 ? 'time' : 'times'}
          </Text>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
