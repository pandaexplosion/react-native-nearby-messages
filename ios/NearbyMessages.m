#import "NearbyMessages-Bridging-Header.h"
#import "RCTBridgeModule.h"
#import "RCTEventEmitter.h"

@interface RCT_EXTERN_REMAP_MODULE(GoogleNearbyMessages, NearbyMessages, NSObject)

RCT_EXTERN_METHOD(connect:(NSString)apiKey discoveryModes:(NSArray)discoveryModes discoveryMediums:(NSArray)discoveryMediums resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject);
RCT_EXTERN_METHOD(disconnect);
RCT_EXTERN_METHOD(publish:(NSString)message resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject);
RCT_EXTERN_METHOD(unpublish);
RCT_EXTERN_METHOD(subscribe:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject);
RCT_EXTERN_METHOD(unsubscribe);
RCT_EXTERN_METHOD(checkBluetoothPermission:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject);
RCT_EXTERN_METHOD(checkBluetoothAvailability:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject);

@end
