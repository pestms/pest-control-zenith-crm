
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const dummyAccounts = [
  {
    id: 'admin-1',
    name: 'Sarah Johnson',
    email: 'sarah@pestguard.com',
    role: 'admin'
  },
  {
    id: 'agent-1',
    name: 'Mike Wilson',
    email: 'mike@pestguard.com',
    role: 'agent'
  }
];

export function AccountSwitcher() {
  const [selectedAccount, setSelectedAccount] = React.useState('admin-1');
  
  const handleAccountSwitch = (accountId: string) => {
    setSelectedAccount(accountId);
    // In a real app, this would update your auth context/store
    const account = dummyAccounts.find(acc => acc.id === accountId);
    console.log('Switching to account:', account);
    // Force page reload to apply new role
    window.location.reload();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Test Account Switcher</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={selectedAccount} onValueChange={handleAccountSwitch}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {dummyAccounts.map(account => (
              <SelectItem key={account.id} value={account.id}>
                {account.name} ({account.role})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="text-sm text-muted-foreground">
          <p><strong>Admin Account:</strong> Full access to all features</p>
          <p><strong>Agent Account:</strong> Personal profile + lead management</p>
        </div>
      </CardContent>
    </Card>
  );
}
