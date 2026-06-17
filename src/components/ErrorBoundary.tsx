import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ErrorHandler } from '@/lib/errors/ErrorHandler';
import { AppError } from '@/lib/errors/AppError';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
  onError?: (error: AppError) => void;
}

interface State {
  hasError: boolean;
  error: AppError | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    const appError = ErrorHandler.handle(error);
    return { hasError: true, error: appError };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const appError = ErrorHandler.handle(error, {
      componentStack: errorInfo.componentStack,
    });
    this.props.onError?.(appError);
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      const error = this.state.error;
      return (
        <div className="flex items-center justify-center min-h-[300px] p-8">
          <div className="text-center max-w-md space-y-4">
            <AlertTriangle className="w-12 h-12 text-destructive mx-auto" />
            <h3 className="text-lg font-semibold text-foreground">
              {this.props.fallbackTitle || 'حدث خطأ غير متوقع'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {this.props.fallbackMessage || error.userMessage}
            </p>
            {error.recoverable && (
              <Button onClick={this.handleRetry} variant="outline" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                إعادة المحاولة
              </Button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
