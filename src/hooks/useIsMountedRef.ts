import { useRef, useEffect } from 'react';

/**
 * Hook useIsMountedRef được sử dụng để kiểm tra xem một component đã được mount (hoặc rendered)
 *  hay chưa trong React. Nó sử dụng useRef để lưu trữ trạng thái mount và sử dụng useEffect
 *  để cập nhật trạng thái này khi component bị unmount. Điều này hữu ích khi bạn muốn thực hiện các thao tác như gọi API
 *  hoặc thao tác với DOM chỉ khi component đã được mount.
 */
export default function useIsMountedRef() {
  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
}
