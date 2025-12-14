import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });

    // Здесь можно отправить ошибку в сервис мониторинга (Sentry, LogRocket и т.д.)
    if (process.env.NODE_ENV === 'production') {
      // sendErrorToMonitoring(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#1a1a1a] border-2 border-[#9FF820] p-8 rounded-lg">
            <div className="text-center mb-6">
              <h1 className="text-4xl font-pressStart text-[#9FF820] mb-4">
                ERROR
              </h1>
              <p className="text-[#9FF820] font-quantum text-lg mb-2">
                Что-то пошло не так
              </p>
              <p className="text-[#9FF820]/70 font-quantum text-sm">
                Произошла ошибка при загрузке приложения
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-black/50 border border-[#9FF820]/30 rounded">
                <p className="text-[#9FF820] font-mono text-xs mb-2">
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <pre className="text-[#9FF820]/70 font-mono text-xs overflow-auto max-h-40">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button
                onClick={this.handleReset}
                className="w-full bg-[#9FF820] text-black font-pressStart text-sm py-3 px-6 rounded hover:bg-[#b0ff40] transition-colors"
              >
                Перезагрузить
              </button>
              <a
                href="/"
                className="w-full bg-transparent border-2 border-[#9FF820] text-[#9FF820] font-pressStart text-sm py-3 px-6 rounded hover:bg-[#9FF820]/10 transition-colors text-center"
              >
                На главную
              </a>
            </div>

            <div className="mt-6 text-center">
              <p className="text-[#9FF820]/50 font-quantum text-xs">
                Если проблема повторяется, свяжитесь с поддержкой
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;