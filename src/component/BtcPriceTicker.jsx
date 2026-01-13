import React, { useState, useEffect } from 'react';
import { BiTrendingUp, BiTrendingDown } from 'react-icons/bi';

const btcLogo = "/assets/imgs/logo/bitcoinwala.svg";

const BtcPriceTicker = () => {
  const [btcData, setBtcData] = useState({
    price: null,
    changePercent24h: null,
    loading: true,
    error: false
  });
  const [usdToInrRate, setUsdToInrRate] = useState(88); // Default fallback rate
  const [showInr, setShowInr] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Fetch USD to INR conversion rate
  useEffect(() => {
    const fetchUsdToInrRate = async () => {
      try {
        // Try multiple APIs for USD to INR rate
        const apis = [
          'https://api.exchangerate-api.com/v4/latest/USD',
          'https://api.fixer.io/v1/latest?access_key=YOUR_KEY&base=USD&symbols=INR',
          'https://api.currencylayer.com/live?access_key=YOUR_KEY&currencies=INR'
        ];

        for (const api of apis) {
          try {
            const response = await fetch(api);
            const data = await response.json();

            if (data.rates && data.rates.INR) {
              setUsdToInrRate(data.rates.INR);
              console.log('✓ USD to INR rate fetched:', data.rates.INR);
              return;
            }
          } catch (error) {
            console.warn('USD to INR API failed:', error.message);
          }
        }

        // Fallback to default rate
        console.log('Using default USD to INR rate: 88');
      } catch (error) {
        console.warn('All USD to INR APIs failed, using default rate');
      }
    };

    fetchUsdToInrRate();
  }, []);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-slide for both mobile and desktop
  useEffect(() => {
    const interval = setInterval(() => {
      setShowInr(prev => !prev);
    }, 4000); // Toggle every 4 seconds for smooth experience

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchBtcPrice = async () => {
      // API 1: CoinGecko
      try {
        console.log('1. Trying CoinGecko API...');
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
            changePercent24h: data.bitcoin.usd_24h_change,
            loading: false,
            error: false
          });
          console.log('✓ CoinGecko successful:', data.bitcoin.usd);
          return; // Success, exit early
        }
      } catch (error) {
        console.warn('✗ CoinGecko failed:', error.message);
      }

      // API 2: Coinbase
      try {
        console.log('2. Trying Coinbase API...');
        const response = await fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot');
        const data = await response.json();

        if (data.data && data.data.amount) {
          setBtcData({
            price: parseFloat(data.data.amount),
            changePercent24h: null,
            loading: false,
            error: false
          });
          console.log('✓ Coinbase successful:', data.data.amount);
          return; // Success, exit early
        }
      } catch (error) {
        console.warn('✗ Coinbase failed:', error.message);
      }

      // API 3: Blockchain.info
      try {
        console.log('3. Trying Blockchain.info API...');
        const response = await fetch('https://blockchain.info/ticker');
        const data = await response.json();

        if (data.USD && data.USD.last) {
          setBtcData({
            price: data.USD.last,
            changePercent24h: null,
            loading: false,
            error: false
          });
          console.log('✓ Blockchain.info successful:', data.USD.last);
          return; // Success, exit early
        }
      } catch (error) {
        console.warn('✗ Blockchain.info failed:', error.message);
      }

      // API 4: Binance
      try {
        console.log('4. Trying Binance API...');
        const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
        const data = await response.json();

        if (data.price) {
          setBtcData({
            price: parseFloat(data.price),
            changePercent24h: null,
            loading: false,
            error: false
          });
          console.log('✓ Binance successful:', data.price);
          return; // Success, exit early
        }
      } catch (error) {
        console.warn('✗ Binance failed:', error.message);
      }

      // API 5: Kraken
      try {
        console.log('5. Trying Kraken API...');
        const response = await fetch('https://api.kraken.com/0/public/Ticker?pair=XBTUSD');
        const data = await response.json();

        if (data.result && data.result.XXBTZUSD && data.result.XXBTZUSD.c) {
          setBtcData({
            price: parseFloat(data.result.XXBTZUSD.c[0]),
            changePercent24h: null,
            loading: false,
            error: false
          });
          console.log('✓ Kraken successful:', data.result.XXBTZUSD.c[0]);
          return; // Success, exit early
        }
      } catch (error) {
        console.warn('✗ Kraken failed:', error.message);
      }

      // All APIs failed
      console.error('✗ All APIs failed to fetch BTC price');
      setBtcData(prev => ({ ...prev, loading: false }));
    };

    // Initial fetch
    fetchBtcPrice();

    // Update every 60 seconds
    const interval = setInterval(fetchBtcPrice, 60000);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price, currency = 'USD') => {
    if (!price) return '---';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getInrPrice = () => {
    if (!btcData.price) return null;
    return btcData.price * usdToInrRate;
  };

  const formatChange = (change) => {
    if (change === null || change === undefined) return '---';
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  const isPositive = btcData.changePercent24h >= 0;

  return (
    <div className="transition-all duration-700 ease-out">
      <div className="flex items-center justify-center">
        {/* Mobile Layout - Horizontal */}
        <div className="flex md:hidden items-center justify-center gap-4 sm:gap-6 w-full cursor-pointer group px-2 sm:px-4"
          onClick={() => setShowInr(!showInr)}>

          {/* Powered by BitcoinWala */}
          <div className="flex flex-col items-center gap-0.5">

            <a
              href="https://www.bitcoinwala.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={btcLogo}
                alt="BitcoinWala"
                className="h-10 sm:h-12 w-auto transition-transform duration-300 hover:scale-110"
              />
            </a>
          </div>

          {/* Price Display with Auto Animation */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-white text-[10px] sm:text-xs font-bold">
              <span className="text-[#FF9900]">BTC</span><span className="!text-white">/</span><span className="!text-white">{showInr ? 'INR' : 'USD'}</span>
            </span>

            {btcData.loading ? (
              <div className="h-8 sm:h-10 w-48 sm:w-64 bg-[#2a2a2a] animate-pulse rounded"></div>
            ) : (
              <div className="relative w-48 sm:w-64 flex justify-center">
                {/* USD Price */}
                <span className={`text-[#FF9900] font-bold text-2xl sm:text-3xl transition-all duration-500 transform ${showInr ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                  }`}>
                  {formatPrice(btcData.price, 'USD')}
                </span>

                {/* INR Price */}
                <span className={`absolute top-0 left-0 w-full text-center text-[#FF9900] font-bold text-2xl sm:text-3xl transition-all duration-500 transform ${showInr ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                  }`}>
                  {formatPrice(getInrPrice(), 'INR')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Layout - Vertical (same as mobile) */}
        <div className="hidden md:flex flex-col items-start gap-3 w-full cursor-pointer group pl-0 -ml-12"
          onClick={() => setShowInr(!showInr)}>

          {/* Powered by BitcoinWala */}
          <div className="flex flex-col items-center gap-2">

            <a
              href="https://www.bitcoinwala.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={btcLogo}
                alt="BitcoinWala"
                className="h-8 w-auto lg:h-9 xl:h-10 transition-transform duration-300 hover:scale-110"
              />
            </a>
          </div>

          {/* Price Display with Auto Animation */}
          <div className="flex flex-col items-center gap-1 -ml-6">
            <span className="text-white text-sm font-bold">
              <span className="text-[#FF9900]">BTC</span><span className="!text-white">/</span><span className="!text-white">{showInr ? 'INR' : 'USD'}</span>
            </span>

            {btcData.loading ? (
              <div className="h-6 w-40 bg-[#2a2a2a] animate-pulse rounded"></div>
            ) : (
              <div className="relative w-40 flex justify-center">
                {/* USD Price */}
                <span className={`text-[#FF9900] font-bold text-2xl transition-all duration-500 transform ${showInr ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                  }`}>
                  {formatPrice(btcData.price, 'USD')}
                </span>

                {/* INR Price */}
                <span className={`absolute top-0 left-0 w-full text-center text-[#FF9900] font-bold text-2xl transition-all duration-500 transform ${showInr ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                  }`}>
                  {formatPrice(getInrPrice(), 'INR')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BtcPriceTicker;




