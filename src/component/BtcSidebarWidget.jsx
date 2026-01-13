import React, { useState, useEffect } from 'react';

const btcLogo = "/assets/imgs/logo/bitcoinwala.png";

const BtcSidebarWidget = () => {
  const [btcData, setBtcData] = useState({
    price: null,
    loading: true,
    error: false
  });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchBtcPrice = async () => {
      // API 1: CoinGecko
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true',
          {
            headers: { 'Accept': 'application/json' }
          }
        );

        if (!response.ok) throw new Error(`CoinGecko failed: ${response.status}`);

        const data = await response.json();
        if (data.bitcoin) {
          setBtcData({
            price: data.bitcoin.usd,
            loading: false,
            error: false
          });
          return;
        }
      } catch (error) {
        console.warn('CoinGecko failed:', error.message);
      }

      // API 2: Coinbase
      try {
        const response = await fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot');
        const data = await response.json();

        if (data.data && data.data.amount) {
          setBtcData({
            price: parseFloat(data.data.amount),
            loading: false,
            error: false
          });
          return;
        }
      } catch (error) {
        console.warn('Coinbase failed:', error.message);
      }

      // API 3: Blockchain.info
      try {
        const response = await fetch('https://blockchain.info/ticker');
        const data = await response.json();

        if (data.USD && data.USD.last) {
          setBtcData({
            price: data.USD.last,
            loading: false,
            error: false
          });
          return;
        }
      } catch (error) {
        console.warn('Blockchain.info failed:', error.message);
      }

      // API 4: Binance
      try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
        const data = await response.json();

        if (data.price) {
          setBtcData({
            price: parseFloat(data.price),
            loading: false,
            error: false
          });
          return;
        }
      } catch (error) {
        console.warn('Binance failed:', error.message);
      }

      // API 5: Kraken
      try {
        const response = await fetch('https://api.kraken.com/0/public/Ticker?pair=XBTUSD');
        const data = await response.json();

        if (data.result && data.result.XXBTZUSD && data.result.XXBTZUSD.c) {
          setBtcData({
            price: parseFloat(data.result.XXBTZUSD.c[0]),
            loading: false,
            error: false
          });
          return;
        }
      } catch (error) {
        console.warn('Kraken failed:', error.message);
      }

      // All APIs failed
      setBtcData(prev => ({ ...prev, loading: false }));
    };

    fetchBtcPrice();
    const interval = setInterval(fetchBtcPrice, 60000);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price) => {
    if (!price) return '---';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ease-in-out"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="border border-[#FF9900]/20 bg-black/90 p-4 rounded-lg shadow-[0_0_15px_rgba(255,153,0,0.2)] hover:border-[#FF9900]/50 transition-colors">
        {/* Collapsed state - Just logo */}
        {!isExpanded && (
          <div className="flex items-center justify-center">
            <img
              src={btcLogo}
              alt="Bitcoin"
              className="h-12 w-auto"
            />
          </div>
        )}

        {/* Expanded state - Full info */}
        {isExpanded && (
          <div className="flex flex-col items-center gap-3 min-w-[160px]">
            <img
              src={btcLogo}
              alt="Bitcoin"
              className="h-16 w-auto"
            />
            <div className="flex flex-col items-center gap-1">
              <span className="text-white text-xs font-semibold">BTC/USD</span>
              {btcData.loading ? (
                <div className="h-6 w-24 bg-[#2a2a2a] animate-pulse rounded"></div>
              ) : (
                <span className="text-[#FF9900] font-bold">BTC Price: {formatPrice(btcData.price)}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BtcSidebarWidget;




