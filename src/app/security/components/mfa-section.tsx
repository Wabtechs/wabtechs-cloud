'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@wabtechs/ui/card';
import { Button } from '@wabtechs/ui/button';
import { Badge } from '@wabtechs/ui/badge';
import { Switch } from '@wabtechs/ui';
import { Input } from '@wabtechs/ui/input';
import { Label } from '@wabtechs/ui/label';
import { ShieldCheck, Smartphone, Copy, Check, Loader2, AlertTriangle } from '@wabtechs/icons';
import { toast } from 'sonner';
import { Skeleton } from '@wabtechs/ui/skeleton';

export function MfaSection() {
  const [enabling, setEnabling] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mfaEnabled] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Backup code copied');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5" />
          Multi-Factor Authentication
        </CardTitle>
        <CardDescription>
          Add an extra layer of security to your account by requiring a second form of authentication.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <Smartphone className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Authenticator App</p>
              <p className="text-sm text-muted-foreground">
                Use an authenticator app like Google Authenticator or Authy
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {mfaEnabled ? (
              <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                Enabled
              </Badge>
            ) : (
              <Badge variant="secondary">Not enabled</Badge>
            )}
            <Button
              variant={mfaEnabled ? 'outline' : 'default'}
              size="sm"
              onClick={() => setEnabling(!enabling)}
              disabled={enabling}
            >
              {mfaEnabled ? 'Manage' : 'Enable'}
            </Button>
          </div>
        </div>

        {enabling && (
          <div className="p-4 border rounded-lg bg-accent/50 space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <p className="text-sm font-medium">Setup required</p>
            </div>
            <p className="text-sm text-muted-foreground">
              To enable multi-factor authentication, please contact your organization administrator.
              MFA enforcement policies are managed at the organization level.
            </p>
          </div>
        )}

        {mfaEnabled && (
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <p className="text-sm font-medium mb-2">Backup Codes</p>
              <p className="text-sm text-muted-foreground mb-4">
                Store these backup codes securely. They can be used to access your account if you lose your authenticator device.
              </p>
              <div className="grid grid-cols-2 gap-2 max-w-md">
                {['8X4F-2K9M', 'P7W3-N6Q1', 'R2T8-B5V6', 'D9H4-L3J7', 'C1M6-Y8F2'].map((code) => (
                  <div
                    key={code}
                    className="flex items-center justify-between p-2 bg-muted rounded font-mono text-sm"
                  >
                    <span>{code}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleCopy(code)}
                    >
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                ))}
              </div>
              <Button variant="link" className="p-0 mt-2 h-auto text-sm">
                Generate new backup codes
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
