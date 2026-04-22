//  import { api } from '@/components/common/api';
// import { ApiError, IbRequestModel } from '@/generated';
// import Clients from '@/pages/IB/Clients';
// import {
//   BankOutlined,
//   CheckCircleOutlined,
//   ClockCircleOutlined,
//   CopyOutlined,
//   DashboardOutlined,
//   LinkOutlined,
//   MailOutlined,
//   SendOutlined,
//   StarOutlined,
//   TeamOutlined,
//   UserOutlined,
  
// } from '@ant-design/icons';
// import { Button, message, Typography } from 'antd';
// import React, { useEffect, useState } from 'react';
// import '../../common.css';
// import config from '../../components/config.json';
// import CustomLoader from '../CustomLoader';

// const { Title, Text } = Typography;

// // Base URL configuration
// let BaseUrl;
// if (config.prod === 'yes') {
//   BaseUrl = config.baseUrl;
// } else {
//   BaseUrl = config.local + ':' + config.localPort;
// }

// // Dashboard component
// const DashboardContent = () => {
//   const [ibRequest, setIbRequest] = useState<IbRequestModel>({});
//   const [requested, setRequested] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState([]);
//   const [hoveredCard, setHoveredCard] = useState<string | null>(null);

//   // Fetch data on component mount
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 1000);

//     return () => {
//       clearTimeout(timer);
//     };
//   }, []);

//   useEffect(() => {
//     api.ib
//       .getMyRequests()
//       .then((response) => {
//         if (response.length > 0) {
//           setData(response);
//           setIbRequest(response[0]);
//           setRequested(true);
//         }
//       })
//       .catch(() => {});
//     setRequested(false);
//   }, []);

//   // Request IB account function
//   const requestIbAccount = async () => {
//     setLoading(true);
//     try {
//       const response = await api.ib.postIbRequest({
//         userComment: 'Please create an IB account.',
//       });
//       message.success({
//         content: 'IB account requested successfully!',
//         icon: <CheckCircleOutlined style={{ color: '#34a853' }} />,
//         duration: 3,
//       });
//       setRequested(true);
//       setIbRequest(response[0]);
//       setData(response);
//     } catch (e) {
//       const er = e as ApiError;
//       message.error({
//         content: er.body.message,
//         duration: 3,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Loading state
//   if (loading) {
//     return <CustomLoader />;
//   }

//   // Not requested state
//   if (!requested) {
//     return (
//       <div className="ib-onboarding-container">
//         <div className="ib-onboarding-card">
//           <div style={{ marginBottom: '24px' }}>
//             <BankOutlined className="ib-onboarding-icon" />
//           </div>
//           <Title level={3} className="ib-onboarding-title">
//             Become an IB Partner
//           </Title>
//           <Text className="ib-onboarding-description">
//             Join our introducing broker program and earn commissions by referring clients to our
//             trading platform. Build your network and grow your revenue with our comprehensive
//             partnership program.
//           </Text>
//           <Button
//             type="primary"
//             size="large"
//             onClick={requestIbAccount}
//             className="ib-primary-button"
//             icon={<StarOutlined />}
//           >
//             Request IB Account
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   const getStatusColor = (status: string) => {
//     switch (status?.toLowerCase()) {
//       case 'approved':
//         return '#34a853';
//       case 'pending':
//         return '#fbbc04';
//       case 'rejected':
//         return '#ea4335';
//       default:
//         return '#1a73e8';
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status?.toLowerCase()) {
//       case 'approved':
//         return <CheckCircleOutlined />;
//       case 'pending':
//         return <ClockCircleOutlined />;
//       default:
//         return <ClockCircleOutlined />;
//     }
//   };

//   // Attractive masonry-style structure
//   return (
//     <div>
//       {/* Page Header */}
//       <div className="ib-page-header">
//         <Title level={2} className="ib-page-title">
//           IB Dashboard
//         </Title>
//         <Text className="ib-page-subtitle">
//           Monitor your account status and manage your referral activities
//         </Text>
//       </div>

//       {/* Masonry Grid Layout */}
//       <div style={{ 
//         display: 'grid', 
//         gridTemplateColumns: 'repeat(3, 1fr)', 
//         gridTemplateRows: 'auto auto auto', 
//         gap: '20px',
//         gridTemplateAreas: `
//           "status referral referral"
//           "code referral referral"
//           "manager . ."
//         `
//       }}>
//         {/* Status Card - Top Left */}
//         <div
//           className={`ib-stat-card ${hoveredCard === 'status' ? 'hovered' : ''}`}
//           onMouseEnter={() => setHoveredCard('status')}
//           onMouseLeave={() => setHoveredCard(null)}
//           style={{ gridArea: 'status' }}
//         >
//           <div
//             className="ib-icon-container status"
//             style={{ backgroundColor: getStatusColor(ibRequest.status || 'Pending') + '10' }}
//           >
//             {React.cloneElement(getStatusIcon(ibRequest.status || 'Pending'), {
//               style: { fontSize: '20px', color: getStatusColor(ibRequest.status || 'Pending') },
//             })}
//           </div>
//           <Text className="ib-stat-label">Account Status</Text>
//           <Title level={4} className="ib-stat-value">
//             {ibRequest.status || 'Pending'}
//           </Title>
//         </div>

//         {/* IB Code Card - Middle Left */}
//         <div
//           className={`ib-stat-card ${hoveredCard === 'code' ? 'hovered' : ''}`}
//           onMouseEnter={() => setHoveredCard('code')}
//           onMouseLeave={() => setHoveredCard(null)}
//           style={{ gridArea: 'code' }}
//         >
//           <div className="ib-icon-container code">
//             <LinkOutlined style={{ fontSize: '20px', color: '#1a73e8' }} />
//           </div>
//           <Text className="ib-stat-label">IB Code</Text>
//           <Title level={4} className="ib-stat-value code">
//             {ibRequest.ibCode || 'Pending'}
//           </Title>
//         </div>

//         {/* Manager Card - Bottom Left */}
//         <div
//           className={`ib-stat-card ${hoveredCard === 'manager' ? 'hovered' : ''}`}
//           onMouseEnter={() => setHoveredCard('manager')}
//           onMouseLeave={() => setHoveredCard(null)}
//           style={{ gridArea: 'manager' }}
//         >
//           <div className="ib-icon-container manager">
//             <UserOutlined style={{ fontSize: '20px', color: '#5f6368' }} />
//           </div>
//           <Text className="ib-stat-label">Account Manager</Text>
//           <Title level={4} className="ib-stat-value">
//             {ibRequest.managerName || 'Not Assigned'}
//           </Title>
//         </div>

//         {/* Referral Card - Large Right Side */}
//         <div className="ib-referral-card" style={{ 
//           gridArea: 'referral',
//           height: 'fit-content',
//           minHeight: '300px',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center'
//         }}>
//           <Title level={4} className="ib-referral-title">
//             Referral Link
//           </Title>
//           <Text className="ib-referral-description" style={{ marginBottom: '24px' }}>
//             Share this link with potential clients to earn commissions on their trading activities.
//           </Text>

//           <div className="ib-link-box" style={{ marginBottom: '20px' }}>
//             <Text className="ib-link-text">
//               {ibRequest.ibCode
//                 ? `${BaseUrl}/user/login/Signup?signup=true&promo=${ibRequest.ibCode}`
//                 : 'Your referral link will be generated once your account is approved'}
//             </Text>
//             {ibRequest.ibCode && (
//               <Button
//                 className="ib-copy-button"
//                 icon={<CopyOutlined />}
//                 onClick={() => {
//                   navigator.clipboard.writeText(
//                     `${BaseUrl}/user/login/Signup?signup=true&promo=${ibRequest.ibCode}`,
//                   );
//                   message.success({
//                     content: 'Link copied to clipboard',
//                     icon: <CheckCircleOutlined style={{ color: '#34a853' }} />,
//                     duration: 2,
//                   });
//                 }}
//               >
//                 Copy
//               </Button>
//             )}
//           </div>

//           {/* Additional referral info */}
//           <div style={{ 
//             padding: '16px', 
//             backgroundColor: '#f8f9fa', 
//             borderRadius: '6px',
//             border: '1px solid #e8eaed'
//           }}>
//             <Text style={{ fontSize: '12px', color: '#5f6368' }}>
//               💡 <strong>Tip:</strong> Share your referral link through social media, email, or direct messaging to maximize your reach and earn more commissions.
//             </Text>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main IB component with elegant tabs
// const IB = () => {
//   const [activeKey, setActiveKey] = useState('1');

//   return (
//     <div className="ib-container">
//       <div className="ib-content-wrapper">
//         <div className="ib-custom-tabs">
//           {/* Elegant Tab Header */}
//           <div className="ib-tab-header">
//             <button
//               className={`ib-tab-button ${activeKey === '1' ? 'active' : ''}`}
//               onClick={() => setActiveKey('1')}
//             >
//               <DashboardOutlined style={{ fontSize: '16px' }} />
//               Dashboard
//             </button>
//             <button
//               className={`ib-tab-button ${activeKey === '2' ? 'active' : ''}`}
//               onClick={() => setActiveKey('2')}
//             >
//               <TeamOutlined style={{ fontSize: '16px' }} />
//               Clients
//             </button>
//           </div>

//           {/* Tab Content */}
//           <div className="ib-tab-content">
//             {activeKey === '1' ? <DashboardContent /> : <Clients />}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IB;








//  import { api } from '@/components/common/api';
// import { ApiError, IbRequestModel } from '@/generated';
// import {
//   BankOutlined,
//   CheckCircleOutlined,
//   ClockCircleOutlined,
//   CopyOutlined,
//   LinkOutlined,
//   StarOutlined,
//   TeamOutlined,
//   UserOutlined,
//   TrophyOutlined,
//   DollarOutlined,
//   UsergroupAddOutlined,
// } from '@ant-design/icons';
// import { Button, message, Typography, Card, Row, Col, Table, Progress } from 'antd';
// import React, { useEffect, useState } from 'react';
// import '../../common.css';
// import config from '../../components/config.json';
// import CustomLoader from '../CustomLoader';
// import Clients from '@/pages/IB/Clients'; // ✅ your existing Clients page (real API data)

// const { Title, Text } = Typography;

// // Base URL config
// let BaseUrl;
// if (config.prod === 'yes') {
//   BaseUrl = config.baseUrl;
// } else {
//   BaseUrl = config.local + ':' + config.localPort;
// }

// const IB = () => {
//   const [ibRequest, setIbRequest] = useState<IbRequestModel>({});
//   const [requested, setRequested] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState([]);
//   const [hoveredCard, setHoveredCard] = useState<string | null>(null);

//   // Fetch IB request data
//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     api.ib
//       .getMyRequests()
//       .then((response) => {
//         if (response.length > 0) {
//           setData(response);
//           setIbRequest(response[0]);
//           setRequested(true);
//         }
//       })
//       .catch(() => {});
//     setRequested(false);
//   }, []);

//   // Request IB Account
//   const requestIbAccount = async () => {
//     setLoading(true);
//     try {
//       const response = await api.ib.postIbRequest({
//         userComment: 'Please create an IB account.',
//       });
//       message.success({
//         content: 'IB account requested successfully!',
//         icon: <CheckCircleOutlined style={{ color: '#34a853' }} />,
//         duration: 3,
//       });
//       setRequested(true);
//       setIbRequest(response[0]);
//       setData(response);
//     } catch (e) {
//       const er = e as ApiError;
//       message.error({
//         content: er.body.message,
//         duration: 3,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Status Colors
//   const getStatusColor = (status: string) => {
//     switch (status?.toLowerCase()) {
//       case 'approved':
//         return '#34a853';
//       case 'pending':
//         return '#fbbc04';
//       case 'rejected':
//         return '#ea4335';
//       default:
//         return '#1a73e8';
//     }
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status?.toLowerCase()) {
//       case 'approved':
//         return <CheckCircleOutlined />;
//       case 'pending':
//         return <ClockCircleOutlined />;
//       default:
//         return <ClockCircleOutlined />;
//     }
//   };

//   // Loading
//   if (loading) return <CustomLoader />;

//   // Not Requested
//   if (!requested) {
//     return (
//       <div className="ib-onboarding-container">
//         <div className="ib-onboarding-card">
//           <div style={{ marginBottom: '24px' }}>
//             <BankOutlined className="ib-onboarding-icon" />
//           </div>
//           <Title level={3} className="ib-onboarding-title">
//             Become an IB Partner
//           </Title>
//           <Text className="ib-onboarding-description">
//             Join our introducing broker program and earn commissions by referring clients.
//           </Text>
//           <Button
//             type="primary"
//             size="large"
//             onClick={requestIbAccount}
//             className="ib-primary-button"
//             icon={<StarOutlined />}
//           >
//             Request IB Account
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   // Main Dashboard Page
//   return (
//     <div className="ib-container">
//       <div className="ib-content-wrapper">
//         <div className="ib-custom-tabs">
//           <div className="ib-tab-content">
//             {/* Hero Section */}
//             <div
//               style={{
//                 background: 'linear-gradient(135deg, #F58C35 0%, #1a73e8 100%)',
//                 borderRadius: '16px',
//                 padding: '40px',
//                 marginBottom: '32px',
//                 color: 'white',
//                 position: 'relative',
//                 overflow: 'hidden',
//               }}
//             >
//               <Row align="middle" justify="space-between">
//                 <Col span={16}>
//                   <Title level={1} style={{ color: 'white', marginBottom: '8px' }}>
//                     Welcome to Your IB Dashboard
//                   </Title>
//                   <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px' }}>
//                     Track your performance, manage clients, and grow your network
//                   </Text>
//                 </Col>
//                 <Col span={8} style={{ textAlign: 'right' }}>
//                   <TrophyOutlined style={{ fontSize: '80px', opacity: 0.3 }} />
//                 </Col>
//               </Row>
//             </div>

//             {/* Stats Cards */}
//             <Row gutter={[20, 20]} style={{ marginBottom: '32px' }}>
//               <Col xs={24} sm={12} lg={6}>
//                 <div
//                   className={`ib-stat-card ${hoveredCard === 'status' ? 'hovered' : ''}`}
//                   onMouseEnter={() => setHoveredCard('status')}
//                   onMouseLeave={() => setHoveredCard(null)}
//                   style={{ height: '140px' }}
//                 >
//                   <div
//                     className="ib-icon-container status"
//                     style={{ backgroundColor: getStatusColor(ibRequest.status || 'Pending') + '10' }}
//                   >
//                     {React.cloneElement(getStatusIcon(ibRequest.status || 'Pending'), {
//                       style: { fontSize: '20px', color: getStatusColor(ibRequest.status || 'Pending') },
//                     })}
//                   </div>
//                   <Text className="ib-stat-label">Account Status</Text>
//                   <Title level={4} className="ib-stat-value">
//                     {ibRequest.status || 'Pending'}
//                   </Title>
//                 </div>
//               </Col>
//               {/* Commission / Clients / Trades can come from API later */}
//               <Col xs={24} sm={12} lg={6}>
//                 <div className="ib-stat-card">
//                   <div className="ib-icon-container" style={{ backgroundColor: '#34a85310' }}>
//                     <DollarOutlined style={{ fontSize: '20px', color: '#34a853' }} />
//                   </div>
//                   <Text className="ib-stat-label">Total Commission</Text>
//                   <Title level={4} className="ib-stat-value">$0.00</Title>
//                 </div>
//               </Col>
//               <Col xs={24} sm={12} lg={6}>
//                 <div className="ib-stat-card">
//                   <div className="ib-icon-container" style={{ backgroundColor: '#1a73e810' }}>
//                     <UsergroupAddOutlined style={{ fontSize: '20px', color: '#1a73e8' }} />
//                   </div>
//                   <Text className="ib-stat-label">Clients</Text>
//                   <Title level={4} className="ib-stat-value">--</Title>
//                 </div>
//               </Col>
//               <Col xs={24} sm={12} lg={6}>
//                 <div className="ib-stat-card">
//                   <div className="ib-icon-container" style={{ backgroundColor: '#fbbc0410' }}>
//                     <TrophyOutlined style={{ fontSize: '20px', color: '#fbbc04' }} />
//                   </div>
//                   <Text className="ib-stat-label">Trades</Text>
//                   <Title level={4} className="ib-stat-value">--</Title>
//                 </div>
//               </Col>
//             </Row>

//             {/* Referral & Clients Section */}
//             <Row gutter={[24, 24]}>
//               {/* Referral */}
//               <Col xs={24} lg={8}>
//                 <div className="ib-referral-card">
//                   <Title level={4} className="ib-referral-title">
//                     <LinkOutlined style={{ marginRight: '8px', color: '#1a73e8' }} />
//                     Referral Link
//                   </Title>
//                   <Text>Share this link to earn commissions on your clients’ trades.</Text>
//                   <div
//                     style={{
//                       padding: '16px',
//                       backgroundColor: '#f0f8ff',
//                       borderRadius: '8px',
//                       margin: '16px 0',
//                       border: '2px dashed #1a73e8',
//                     }}
//                   >
//                     <Text className="ib-stat-label">Your IB Code</Text>
//                     <Title level={3} style={{ margin: 0, color: '#1a73e8' }}>
//                       {ibRequest.ibCode || 'Pending'}
//                     </Title>
//                   </div>

//                   <div className="ib-link-box">
//                     <Text>
//                       {ibRequest.ibCode
//                         ? `${BaseUrl}/user/login/Signup?signup=true&promo=${ibRequest.ibCode}`
//                         : 'Referral link will be generated once approved'}
//                     </Text>
//                     {ibRequest.ibCode && (
//                       <Button
//                         className="ib-copy-button"
//                         icon={<CopyOutlined />}
//                         onClick={() => {
//                           navigator.clipboard.writeText(
//                             `${BaseUrl}/user/login/Signup?signup=true&promo=${ibRequest.ibCode}`,
//                           );
//                           message.success('Link copied to clipboard');
//                         }}
//                       >
//                         Copy
//                       </Button>
//                     )}
//                   </div>

//                   <Progress percent={50} strokeColor="#34a853" size="small" />
//                   <div style={{ marginTop: '12px' }}>
//                     <UserOutlined /> Manager: <b>{ibRequest.managerName || 'Not Assigned'}</b>
//                   </div>
//                 </div>
//               </Col>

//               {/* Clients Table */}
//               <Col xs={24} lg={16}>
//                 <Card
//                   title={
//                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                       <TeamOutlined style={{ color: '#1a73e8' }} />
//                       <span>Client Portfolio</span>
//                     </div>
//                   }
//                 >
//                   {/* ✅ Using your real Clients component instead of mock */}
//                   <Clients />
//                 </Card>
//               </Col>
//             </Row>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IB;
import { api } from '@/components/common/api';
import { ApiError, IbRequestModel } from '@/generated';
import {
  BankOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CopyOutlined,
  LinkOutlined,
  StarOutlined,
  TeamOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Button, message, Typography, Card, Row, Col, Progress } from 'antd';
import React, { useEffect, useState } from 'react';
import '../../common.css';
import config from '../../components/config.json';
import CustomLoader from '../CustomLoader';
import Clients from '@/pages/IB/Clients';

const { Title, Text } = Typography;

// Base URL config
const BaseUrl = config.prod === 'yes' ? config.baseUrl : `${config.local}:${config.localPort}`;

const IB = () => {
  const [ibRequest, setIbRequest] = useState<IbRequestModel>({});
  const [requested, setRequested] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    api.ib
      .getMyRequests()
      .then((response) => {
        if (response.length > 0) {
          setData(response);
          setIbRequest(response[0]);
          setRequested(true);
        }
      })
      .catch(() => setRequested(false));
  }, []);

  const requestIbAccount = async () => {
    setLoading(true);
    try {
      const response = await api.ib.postIbRequest({
        userComment: 'Please create an IB account.',
      });
      message.success({
        content: 'IB account requested successfully!',
        icon: <CheckCircleOutlined style={{ color: '#34a853' }} />,
        duration: 3,
      });
      setRequested(true);
      setIbRequest(response[0]);
      setData(response);
    } catch (e) {
      const er = e as ApiError;
      message.error({ content: er.body.message, duration: 3 });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return '#34a853';
      case 'pending':
        return '#fbbc04';
      case 'rejected':
        return '#ea4335';
      default:
        return '#1a73e8';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return <CheckCircleOutlined />;
      case 'pending':
      default:
        return <ClockCircleOutlined />;
    }
  };

  if (loading) return <CustomLoader />;

  if (!requested)
    return (
      <div className="ib-onboarding-container">
        <div className="ib-onboarding-card">
          <BankOutlined className="ib-onboarding-icon" />
          <Title level={3} className="ib-onboarding-title">
            Become an IB Partner
          </Title>
          <Text className="ib-onboarding-description">
            Join our introducing broker program and earn commissions by referring clients.
          </Text>
          <Button
            type="primary"
            size="large"
            onClick={requestIbAccount}
            className="ib-primary-button"
            icon={<StarOutlined />}
          >
            Request IB Account
          </Button>
        </div>
      </div>
    );

  return (
    <div className="ib-container">
      <div className="ib-content-wrapper">
        <div className="ib-hero-section">
          <Row align="middle" justify="space-between">
            <Col span={16}>
              <Title level={1} className="ib-hero-title">
                Welcome to Your IB Dashboard
              </Title>
              <Text className="ib-hero-description">
                Track your performance, manage clients, and grow your network
              </Text>
            </Col>
          </Row>
        </div>

        {/* Stats Cards */}
        <Row gutter={[20, 20]} className="ib-stats-row">
          <Col xs={24} sm={12} lg={6}>
            <div
              className={`ib-stat-card ${hoveredCard === 'status' ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredCard('status')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className="ib-icon-container status"
                style={{ backgroundColor: getStatusColor(ibRequest.status || 'Pending') + '10' }}
              >
                {React.cloneElement(getStatusIcon(ibRequest.status || 'Pending'), {
                  style: { fontSize: '20px', color: getStatusColor(ibRequest.status || 'Pending') },
                })}
              </div>
              <Text className="ib-stat-label">Account Status</Text>
              <Title level={4} className="ib-stat-value">
                {ibRequest.status || 'Pending'}
              </Title>
            </div>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <div className="ib-stat-card">
              <div className="ib-icon-container">
                <UsergroupAddOutlined className="ib-stat-icon" />
              </div>
              <Text className="ib-stat-label">Clients</Text>
              <Title level={4} className="ib-stat-value">
                --
              </Title>
            </div>
          </Col>
        </Row>

        {/* Referral + Clients */}
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={8}>
            <div className="ib-referral-card">
              <Title level={4} className="ib-referral-title">
                <LinkOutlined className="ib-referral-icon" />
                Referral Link
              </Title>
              <Text>Share this link .</Text>
              <div className="ib-referral-code-box">
                <Text className="ib-referral-label">Your IB Code</Text>
                <Title level={3} className="ib-referral-code">
                  {ibRequest.ibCode || 'Pending'}
                </Title>
              </div>

              <div className="ib-link-box">
                <Text>
                  {ibRequest.ibCode
                    ? `${BaseUrl}/user/login/Signup?signup=true&promo=${ibRequest.ibCode}`
                    : 'Referral link will be generated once approved'}
                </Text>
                {ibRequest.ibCode && (
                  <Button
                    className="ib-copy-button"
                    icon={<CopyOutlined />}
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${BaseUrl}/user/login/Signup?signup=true&promo=${ibRequest.ibCode}`,
                      );
                      message.success('Link copied to clipboard');
                    }}
                  >
                    Copy
                  </Button>
                )}
              </div>

              {/* <Progress percent={50} strokeColor="#34a853" size="small" /> */}
              <div className="ib-manager-box">
                <UserOutlined /> Manager: <b>{ibRequest.managerName || 'Not Assigned'}</b>
              </div>
            </div>
          </Col>

          <Col xs={24} lg={16}>
            <Card className="ib-clients-card">
              <Clients defaultTab="active" />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default IB;
